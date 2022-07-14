import { cold, hot } from 'jasmine-marbles';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import {
  NavigationMenu, PageContents,
} from '../models';
import { ApiService } from './api.service';
import {
  PageContentService,
} from './page-content.service';

describe('PageContentService', () => {
  let service: PageContentService;
  let apiSpy: jasmine.SpyObj<ApiService>;
  let titleSpy: jasmine.SpyObj<Title>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<ApiService>('ApiService', [
      'getPageContents',
      'getNavigationMenu',
    ]);
    titleSpy = jasmine.createSpyObj<Title>('Title', ['setTitle']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: Title, useValue: titleSpy },
      ],
    });

    service = TestBed.inject(PageContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPageContents', () => {
    it('should provide api response and set title', () => {
      const pageContents: PageContents = {
        title: 'Hello World',
        divisions: [],
      };
      apiSpy.getPageContents.and.returnValue(
        hot('-a-', {
          a: pageContents,
        }),
      );

      const result$ = service.getPageContents('hello');

      expect(result$).toBeObservable(hot('-a-', { a: pageContents }));
      expect(apiSpy.getPageContents).toHaveBeenCalledWith('hello');
    });
  });

  describe('currentTitle$', () => {
    it('should set title with emit and default correctly', () => {
      const expectedDefault = 'ChillViking | Loading...';
      expect(service.currentTitle$).toBeObservable(cold('a', { a: expectedDefault }));
      expect(titleSpy.setTitle).toHaveBeenCalledWith(expectedDefault);
    });
  });

  describe('publishNavigationMenu', () => {
    it('should return result from api service', () => {
      const navMenu: NavigationMenu = {
        items: [],
        currentEnvironment: 'testing',
      };
      apiSpy.getNavigationMenu.and.returnValue(cold('-0-', [navMenu]));

      service.publishNavigationMenu();

      expect(service.menu$).toBeObservable(cold('-0-', [navMenu]));
      expect(apiSpy.getNavigationMenu).toHaveBeenCalled();
    });
  });
});

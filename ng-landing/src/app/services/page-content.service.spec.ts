import { cold } from 'jasmine-marbles';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { loggerSpy } from '../mocks.spec';
import { PageContents } from '../models';
import { ApiService } from './api.service';
import {
  MonitoringService,
} from './monitoring.service';
import {
  PageContentService,
} from './page-content.service';

@Injectable()
class ExposedPageContentService extends PageContentService {
  get cache() {
    return this._cache;
  }

  set cache(value: { [slug: string]: PageContents }) {
    this._cache = value;
  }
}

describe('PageContentService', () => {
  let exposed: ExposedPageContentService;
  let service: PageContentService;
  let apiSpy: jasmine.SpyObj<ApiService>;
  let titleSpy: jasmine.SpyObj<Title>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj<ApiService>('ApiService', ['getPageContents']);
    titleSpy = jasmine.createSpyObj<Title>('Title', ['setTitle']);

    TestBed.configureTestingModule({
      providers: [
        ExposedPageContentService,
        { provide: ApiService, useValue: apiSpy },
        { provide: Title, useValue: titleSpy },
        { provide: MonitoringService, useValue: loggerSpy },
      ],
    });

    exposed = TestBed.inject(ExposedPageContentService);
    service = exposed;
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
        cold('-a-', {
          a: pageContents,
        }),
      );

      const result$ = service.getPageContents('hello');

      expect(result$).toBeObservable(cold('-a-', { a: pageContents }));
      expect(apiSpy.getPageContents).toHaveBeenCalledWith('hello');
      expect(titleSpy.setTitle).toHaveBeenCalledWith('Hello World');
      expect(exposed.cache).toEqual({ ['hello']: pageContents });
    });

    describe('when contents cached', () => {
      it('should return cached contents and set title', () => {
        const pageContents: PageContents = { title: 'G thang', divisions: [] };
        exposed.cache = { ['world']: pageContents };

        const result$ = service.getPageContents('world');

        expect(result$).toBeObservable(cold('(0|)', [pageContents]));
        expect(apiSpy.getPageContents).not.toHaveBeenCalled();
        expect(titleSpy.setTitle).toHaveBeenCalledWith('G thang');
      });
    });
  });
});

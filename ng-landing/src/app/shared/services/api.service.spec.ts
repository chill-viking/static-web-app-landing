import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  NavigationMenu, PageContents,
} from '../models';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpSpy },
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const getEndpointTheory = <T>(
    endpointName: string,
    serviceFunc: (service: ApiService) => Observable<T>,
    url: string,
    apiResponse: T,
    urlOptions?: any,
    defaultedResponse?: T,
  ) => {
    describe(endpointName, () => {
      it('should return data from http response', () => {
        const httpResponse$ = hot('-0|', [{ data: apiResponse }]);
        httpSpy.get.and.returnValue(httpResponse$);

        const result$ = serviceFunc(service);

        if (!!urlOptions) {
          expect(httpSpy.get).toHaveBeenCalledWith(url, urlOptions);
        } else {
          expect(httpSpy.get).toHaveBeenCalledWith(url);
        }

        expect(result$).toBeObservable(hot('-0|', [apiResponse]));
      });

      describe('when http client throws error', () => {
        if (!!defaultedResponse) {
          it('should return defaulted response', () => {
            httpSpy.get.and.returnValue(hot('-#-', null, { error: 'err' }));

            const result$ = serviceFunc(service);

            expect(result$).toBeObservable(hot('-(0|)', [defaultedResponse]));
          });
        } else {
          it('should return empty object', () => {
            httpSpy.get.and.returnValue(hot('-#-', null, { error: 'err' }));

            const result$ = serviceFunc(service);

            expect(result$).toBeObservable(hot('-(0|)', [{}]));
          });
        }
      });
    });
  };

  getEndpointTheory<PageContents>(
    'getPageContents',
    (service) => service.getPageContents('page-slug'),
    '/api/page-contents',
    {
      title: 'Hello World',
      divisions: [{
        type: 'div',
        class: 'content',
        content: [{ type: 'paragraph', content: 'hello', class: 'world' }],
      }],
    },
    { params: { ['page-slug']: 'page-slug' } },
    {
      title: 'Chill Viking | Oops',
      divisions: [{
        type: 'div',
        class: 'error',
        content: [{
          content: 'Failed to retrieve data',
          type: 'paragraph',
          class: 'error',
        }],
      }],
    },
  );

  getEndpointTheory<NavigationMenu>(
    'getNavigationMenu',
    (service) => service.getNavigationMenu(),
    '/api/navigation-menu',
    {
      currentEnvironment: 'testing',
      items: [{
        id: 'id',
        route: '/home',
        title: 'Home',
        type: 'routerLink',
      }],
    },
  );
});

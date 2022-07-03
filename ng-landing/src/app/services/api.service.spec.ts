import { hot } from 'jasmine-marbles';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PageContents } from '../models';
import { ApiService } from './api.service';
import { MonitoringService } from './monitoring.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: MonitoringService, useValue: jasmine.createSpyObj<MonitoringService>('Logger', ['logException']) },
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPageContents', () => {
    it('should return http response', () => {
      const pageContents: PageContents = {
        title: 'Hello World',
        divisions: [{
          class: 'content',
          content: [{ type: 'paragraph', content: 'hello', class: 'world' }],
        }],
      };
      const httpResponse$ = hot('-0|', [{ data: pageContents }]);
      httpSpy.get.and.returnValue(httpResponse$);

      const result$ = service.getPageContents('hi');

      expect(httpSpy.get).toHaveBeenCalledWith(
        '/api/page-contents',
        { params: { ['page-slug']: 'hi' } },
      );
      expect(result$).toBeObservable(hot('-a|', { a: pageContents }));
    });

    describe('when http client throws error', () => {
      it('should return response with error', () => {
        httpSpy.get.and.returnValue(hot('-#-', null, { error: 'err' }));

        const result$ = service.getPageContents('page-slug');

        const expected: PageContents = {
          title: 'Chill Viking | Oops',
          divisions: [{
            class: 'error',
            content: [{
              content: 'Failed to retrieve data',
              type: 'paragraph',
              class: 'error',
            }],
          }],
        };
        expect(result$).toBeObservable(hot('-(a|)', { a: expected }));
      });
    });
  });
});

import { hot } from 'jasmine-marbles';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Paragraph } from '../models';
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

  describe('getOpeningBlurb', () => {
    it('should return http response', () => {
      var httpResponse$ = hot('-0|', [{ data: [{ content: 'hello', class: 'world' }] }]);
      httpSpy.get.and.returnValue(httpResponse$);

      var result$ = service.getOpeningBlurb();

      expect(httpSpy.get).toHaveBeenCalledWith('/api/opening-blurb');
      expect(result$).toBeObservable(hot('-a|', { a: [{ content: 'hello', class: 'world' }]}));
    });

    describe('when http client throws error', () => {
      it('should return response with error', () => {
        httpSpy.get.and.returnValue(hot('-#-', null, { error: 'err' }));

        var result$ = service.getOpeningBlurb();

        const expected: Paragraph[] = [{
          content: 'Failed to retrieve data',
          class: 'error',
        }];
        expect(result$).toBeObservable(hot('-(a|)', { a: expected }));
      });
    });
  });
});

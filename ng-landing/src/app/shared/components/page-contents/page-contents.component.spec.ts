import { cold, hot } from 'jasmine-marbles';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  LoggerService, PageContentService,
} from '@shared/services';
import {
  PageContentsComponent,
} from './page-contents.component';

describe('PageContentsComponent', () => {
  let component: PageContentsComponent;
  let fixture: ComponentFixture<PageContentsComponent>;
  let pageContentsSpy: jasmine.SpyObj<PageContentService>;

  beforeEach(waitForAsync(() => {
    pageContentsSpy = jasmine.createSpyObj<PageContentService>('PageContentService', ['getPageContents']);
    pageContentsSpy.getPageContents.and.returnValue(cold('-0-', [
      {
        title: '',
        divisions: [
          {
            class: '',
            type: 'div',
            content: [{
              class: 'hello',
              type: 'paragraph',
              content: 'content',
            }],
          }
        ],
      },
    ]));

    TestBed.configureTestingModule({
      declarations: [ PageContentsComponent ],
      providers: [
        { provide: PageContentService, useValue: pageContentsSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageContentsComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('pageSlug input', () => {
    describe('when has value', () => {
      it('should emit contents from page contents service', () => {
        component.pageSlug = 'home';

        fixture.detectChanges();

        expect(component.hasContents$).toBeObservable(hot('01', [false, true]));
        expect(component.paragraphs$).toBeObservable(hot('-0', [[{ class: 'hello', type: 'paragraph', content: 'content' }]]));
        expect(pageContentsSpy.getPageContents).toHaveBeenCalledWith('home');
      });
    });

    describe('when has no value', () => {
      it('should log an exception', () => {
        fixture.detectChanges();

        expect(pageContentsSpy.getPageContents).not.toHaveBeenCalled();
        const loggerSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
        expect(loggerSpy.logException).toHaveBeenCalled();
      });
    });
  });
});

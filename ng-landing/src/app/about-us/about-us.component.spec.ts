import { cold, hot } from 'jasmine-marbles';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import { loggerSpy } from '../mocks.spec';
import {
  MonitoringService, PageContentService,
} from '../services';
import {
  AboutUsComponent,
} from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
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
      declarations: [ AboutUsComponent ],
      providers: [
        { provide: PageContentService, useValue: pageContentsSpy },
        { provide: MonitoringService, useValue: loggerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit contents from page contents service', () => {
    expect(component.hasContents$).toBeObservable(hot('01', [false, true]));
    expect(component.paragraphs$).toBeObservable(hot('-0', [[{ class: 'hello', type: 'paragraph', content: 'content' }]]));
    expect(pageContentsSpy.getPageContents).toHaveBeenCalledWith('about-us');
  });
});

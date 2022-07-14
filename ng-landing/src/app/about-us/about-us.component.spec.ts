import { cold } from 'jasmine-marbles';
import { MockComponent } from 'ng-mocks';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  PageContentService,
} from '@shared/services';
import {
  PageContentControllerComponent,
} from '../page-content/components';
import {
  AboutUsComponent,
} from './about-us.component';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let pageContentSvcSpy: jasmine.SpyObj<PageContentService>;

  beforeEach(waitForAsync(() => {
    pageContentSvcSpy = jasmine.createSpyObj<PageContentService>('PageContentService', ['getPageContents']);
    pageContentSvcSpy.getPageContents.and.returnValue(cold('-'));

    TestBed.configureTestingModule({
      declarations: [
        AboutUsComponent,
        MockComponent(PageContentControllerComponent),
      ],
      providers: [
        { provide: PageContentService, useValue: pageContentSvcSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.slug).toEqual('about-us');
  });
});

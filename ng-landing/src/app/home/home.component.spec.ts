import { cold } from 'jasmine-marbles';
import { MockComponent } from 'ng-mocks';
import {
  ComponentFixture, TestBed, waitForAsync,
} from '@angular/core/testing';
import {
  createPageContentSpy,
} from '@shared/mocks.spec';
import {
  PageContentService,
} from '@shared/services';
import {
  PageContentControllerComponent,
} from '../page-content/components';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let pageContentSvcSpy: jasmine.SpyObj<PageContentService>;

  beforeEach(waitForAsync(() => {
    pageContentSvcSpy = createPageContentSpy();
    pageContentSvcSpy.getPageContents.and.returnValue(cold('-'));

    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockComponent(PageContentControllerComponent),
      ],
      providers: [
        { provide: PageContentService, useValue: pageContentSvcSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.slug).toEqual('home');
  });
});

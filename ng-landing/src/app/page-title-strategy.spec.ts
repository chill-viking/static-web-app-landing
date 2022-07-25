import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import {
  MockStore, provideMockStore,
} from '@ngrx/store/testing';
import {
  PageTitleStrategy,
} from './page-title-strategy';
import { fromPage } from './state/selectors';

describe('PageTitleStrategy', () => {
  let strategy: PageTitleStrategy;
  let mockStore: MockStore;
  let titleSpy: jasmine.SpyObj<Title>;

  beforeEach(() => {
    titleSpy = jasmine.createSpyObj<Title>('Title', ['setTitle']);

    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        { provide: Title, useValue: titleSpy },
      ],
    });

    mockStore = TestBed.inject(MockStore);
    strategy = TestBed.inject(PageTitleStrategy);
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should be created', () => {
    expect(strategy).toBeTruthy();
  });

  describe('updateStrategy', () => {
    it('update title using latest from currentTitle selector', () => {
      mockStore.overrideSelector(fromPage.selectCurrentTitle, 'hello world');

      strategy.updateTitle();

      expect(titleSpy.setTitle).toHaveBeenCalledWith('hello world');
    });
  });
});

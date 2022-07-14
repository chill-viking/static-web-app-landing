import {
  LoggerService, PageContentService,
} from './services';

export function createLoggerSpy(): jasmine.SpyObj<LoggerService> {
  return jasmine.createSpyObj<LoggerService>('MonitoringService', [
    'logEvent',
    'logException',
    'logMetric',
    'logPageView',
  ]);
}

export function createPageContentSpy(): jasmine.SpyObj<PageContentService> {
  return jasmine.createSpyObj<PageContentService>('PageContentService', [
    'getPageContents',
    'publishNavigationMenu',
  ], [
    'currentPageContents$',
    'currentTitle$',
    'menu$',
  ]);
}

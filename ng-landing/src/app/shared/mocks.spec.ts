import { LoggerService } from './services';

export const loggerSpy = jasmine.createSpyObj<LoggerService>('MonitoringService', [
  'logEvent',
  'logException',
  'logMetric',
  'logPageView',
]);

import { MonitoringService } from './services';

export const loggerSpy = jasmine.createSpyObj<MonitoringService>('MonitoringService', [
  'logEvent',
  'logException',
  'logMetric',
  'logPageView',
]);

import { LoggerService } from './services';

export function createLoggerSpy(): jasmine.SpyObj<LoggerService> {
  return jasmine.createSpyObj<LoggerService>('MonitoringService', [
    'logEvent',
    'logException',
    'logMetric',
    'logPageView',
    'logDebug',
  ]);
}

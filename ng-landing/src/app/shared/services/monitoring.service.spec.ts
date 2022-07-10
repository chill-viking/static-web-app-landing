import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ApplicationInsights,
} from '@microsoft/applicationinsights-web';
import {
  MonitoringService,
} from './monitoring.service';

@Injectable()
class ExposedMonitoringService extends MonitoringService {
  overrideAppInsights(appInsights: ApplicationInsights): void {
    this._appInsights = appInsights;
  }
}

describe('MonitoringService', () => {
  let service: MonitoringService;
  let appInsightsSpy: jasmine.SpyObj<ApplicationInsights>;

  beforeEach(() => {
    console.warn = (...args) => {}; // ignore warning for connection string
    appInsightsSpy = jasmine.createSpyObj<ApplicationInsights>('ApplicationInsights', [
      'trackEvent',
      'trackException',
      'trackMetric',
      'trackPageView',
      'trackTrace',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ExposedMonitoringService,
      ],
    });
    const exposed = TestBed.inject(ExposedMonitoringService);
    exposed.overrideAppInsights(appInsightsSpy);

    service = exposed;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use appInsights', () => {
    service.logEvent('name');
    expect(appInsightsSpy.trackEvent).toHaveBeenCalled();

    service.logException({} as Error, 1);
    expect(appInsightsSpy.trackException).toHaveBeenCalled();

    service.logMetric('name', 1);
    expect(appInsightsSpy.trackMetric).toHaveBeenCalled();

    service.logPageView('name');
    expect(appInsightsSpy.trackPageView).toHaveBeenCalled();

    service.logTrace('message');
    expect(appInsightsSpy.trackTrace).toHaveBeenCalled();
  });
});

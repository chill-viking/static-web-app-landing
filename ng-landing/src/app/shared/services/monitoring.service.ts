import { Injectable } from '@angular/core';
import {
  ApplicationInsights, DistributedTracingModes,
} from '@microsoft/applicationinsights-web';
import {
  AppConfigService,
} from './app-config.service';
import { LoggerService } from './logger.service';

@Injectable()
export class MonitoringService extends LoggerService {
  protected _appInsights?: ApplicationInsights;

  constructor(
    appConfig: AppConfigService,
  ) {
    super();

    const conn = appConfig.appInsightsConnectionString;
    if (!conn) {
      console.warn('Application Insights Connection string not found.');
      return;
    }

    this._appInsights = new ApplicationInsights({
      config: {
        connectionString: conn,
        enableAutoRouteTracking: true,
        distributedTracingMode: DistributedTracingModes.AI_AND_W3C,
      },
    });

    this._appInsights.loadAppInsights();
  }

  logPageView(name?: string, uri?: string) {
    this._appInsights?.trackPageView({ name, uri });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    this._appInsights?.trackEvent({ name }, properties);
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    this._appInsights?.trackMetric({ name, average }, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    this._appInsights?.trackException({ exception, severityLevel });
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    this._appInsights?.trackTrace({ message }, properties);
  }
}

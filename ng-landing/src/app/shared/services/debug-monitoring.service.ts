import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable()
export class DebugMonitoringService extends LoggerService {
  logPageView(name?: string | undefined, uri?: string | undefined): void {
    console.log(`Pageview: ${name}`, { uri });
  }
  logEvent(name: string, properties?: { [key: string]: any; } | undefined): void {
    console.log(`Event: ${name}`, properties);
  }
  logMetric(name: string, average: number, properties?: { [key: string]: any; } | undefined): void {
    console.log(`Metric: ${name}`, { average, properties });
  }
  logException(message: string, exception: Error, severityLevel?: number | undefined): void {
    console.error(`${message}, Exception: ${exception.message}`, { exception, severityLevel });
  }
  logTrace(message: string, properties?: { [key: string]: any; } | undefined): void {
    console.trace(`Trace: ${message}`, { properties });
  }
  logDebug(opts: { className?: string; funcOrPropName?: string; message?: string; properties?: { [key: string]: any; }; }): void {
    const message = [
      opts.className,
      opts.funcOrPropName,
      opts.message,
    ].filter(s => !!s).join(' >> ');

    if (!!opts.properties) console.debug(message, opts.properties);
    else console.debug(message);
  }
}

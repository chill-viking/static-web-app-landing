import { Injectable } from '@angular/core';

@Injectable()
export abstract class LoggerService {
  abstract logPageView(name?: string, uri?: string): void;

  abstract logEvent(name: string, properties?: { [key: string]: any }): void;

  abstract logMetric(name: string, average: number, properties?: { [key: string]: any }): void;

  abstract logException(exception: Error, severityLevel?: number): void;

  abstract logTrace(message: string, properties?: { [key: string]: any }): void;

  abstract logDebug(opts: {
    className?: string,
    funcOrPropName?: string,
    message?: string,
    properties?: { [key: string]: any },
  }): void;
}

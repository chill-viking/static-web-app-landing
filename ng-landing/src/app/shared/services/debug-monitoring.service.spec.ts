import { TestBed } from '@angular/core/testing';
import {
  DebugMonitoringService,
} from './debug-monitoring.service';

describe('DebugMonitoringService', () => {
  let service: DebugMonitoringService;
  let consoleSpy: jasmine.SpyObj<Console>;

  beforeEach(() => {
    consoleSpy = jasmine.createSpyObj<Console>('Console', [
      'log',
      'error',
      'trace',
    ]);
    console = consoleSpy;

    TestBed.configureTestingModule({
      providers: [DebugMonitoringService],
    });
    service = TestBed.inject(DebugMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use console', () => {
    service.logEvent('name');
    expect(consoleSpy.log).toHaveBeenCalled();

    service.logException('message', {} as Error, 1);
    expect(consoleSpy.error).toHaveBeenCalled();

    service.logMetric('name', 1);
    expect(console.log).toHaveBeenCalled();

    service.logPageView('name');
    expect(console.log).toHaveBeenCalled();

    service.logTrace('message');
    expect(console.trace).toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';
import {
  createConsoleSpy,
} from '@shared/mocks.spec';
import {
  DebugMonitoringService,
} from './debug-monitoring.service';

describe('DebugMonitoringService', () => {
  let service: DebugMonitoringService;
  let consoleSpy: jasmine.SpyObj<Console>;

  beforeEach(() => {
    consoleSpy = createConsoleSpy();
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
    expect(consoleSpy.log).toHaveBeenCalled();

    service.logPageView('name');
    expect(consoleSpy.log).toHaveBeenCalled();

    service.logTrace('message');
    expect(consoleSpy.trace).toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';

import { AdminAndProducerGuard } from './admin-and-producer.guard';

describe('AdminAndProducerGuard', () => {
  let guard: AdminAndProducerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAndProducerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

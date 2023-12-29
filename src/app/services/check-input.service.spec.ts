import { TestBed } from '@angular/core/testing';

import { CheckInputService } from './check-input.service';

describe('CheckInputService', () => {
  let service: CheckInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

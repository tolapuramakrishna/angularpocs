import { TestBed } from '@angular/core/testing';

import { SuperGridService } from './super-grid.service';

describe('SuperGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperGridService = TestBed.get(SuperGridService);
    expect(service).toBeTruthy();
  });
});

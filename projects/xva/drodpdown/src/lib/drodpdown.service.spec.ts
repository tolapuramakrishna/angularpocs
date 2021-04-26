import { TestBed } from '@angular/core/testing';

import { DrodpdownService } from './drodpdown.service';

describe('DrodpdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrodpdownService = TestBed.get(DrodpdownService);
    expect(service).toBeTruthy();
  });
});

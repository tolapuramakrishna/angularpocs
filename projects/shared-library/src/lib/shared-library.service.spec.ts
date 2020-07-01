import { TestBed } from '@angular/core/testing';

import { SharedLibraryService } from './shared-library.service';

describe('SharedLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedLibraryService = TestBed.get(SharedLibraryService);
    expect(service).toBeTruthy();
  });
});

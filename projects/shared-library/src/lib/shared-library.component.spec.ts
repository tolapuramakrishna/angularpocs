import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLibraryComponent } from './shared-library.component';

describe('SharedLibraryComponent', () => {
  let component: SharedLibraryComponent;
  let fixture: ComponentFixture<SharedLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

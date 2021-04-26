import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrodpdownComponent } from './drodpdown.component';

describe('DrodpdownComponent', () => {
  let component: DrodpdownComponent;
  let fixture: ComponentFixture<DrodpdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrodpdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrodpdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

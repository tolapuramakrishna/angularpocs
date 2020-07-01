import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GirdViewComponent } from './gird-view.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('GirdViewComponent', () => {
  let component: GirdViewComponent;
  let fixture: ComponentFixture<GirdViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,MatCheckboxModule,DragDropModule,
      ],
      declarations: [ GirdViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GirdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

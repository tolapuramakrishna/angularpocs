import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GirdViewComponent } from './gird-view/gird-view.component';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [
    GirdViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,MatCheckboxModule,DragDropModule,
    PaginationModule.forRoot(),
    RouterModule.forChild([{
      path:'',component:GirdViewComponent
    }])
  ]
})
export class DynamicGirdModule { }

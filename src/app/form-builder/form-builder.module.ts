import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormEditorComponent } from './components/form-editor/form-editor.component';
import { FieldLibraryComponent } from './components/field-library/field-library.component';
import { FormHeaderComponent } from './components/form-editor/form-header/form-header.component';
import { FormLinedetailsComponent } from './components/form-editor/form-linedetails/form-linedetails.component';
import { EditorRightpanelComponent } from './components/form-editor/editor-rightpanel/editor-rightpanel.component';
import { PublishedFormsGridComponent } from './components/published-forms-grid/published-forms-grid.component';
import { FormBuilderIndexComponent } from './components/form-builder-index.component';
import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatTooltipModule, MatInputModule } from '@angular/material';
import { AddControlComponent } from './components/add-control/add-control.component';
import { ControlPropertiesViewComponent } from './components/control-properties-view/control-properties-view.component';
import { HeaderDetailsComponent } from './components/form-editor/header-details/header-details.component';
import { AddCategoryModalComponent } from './components/add-category-modal/add-category-modal.component';
import { FieldLibraryIndexComponent } from './components/field-library-index/field-library-index.component';
import { MatDialogModule } from '@angular/material';
import { FormControlService } from './services/form-control.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
    declarations: [FormBuilderIndexComponent,FormEditorComponent, FieldLibraryComponent, FormHeaderComponent, FormLinedetailsComponent, EditorRightpanelComponent, PublishedFormsGridComponent, AddControlComponent, ControlPropertiesViewComponent, HeaderDetailsComponent, AddCategoryModalComponent, FieldLibraryIndexComponent],
  imports: [
      CommonModule,
      FormBuilderRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatTooltipModule,
      MatInputModule,
      MatDialogModule, MatExpansionModule,  
      DragDropModule  
    ],
    entryComponents: [
        AddControlComponent,
        AddCategoryModalComponent,
        ControlPropertiesViewComponent
    ],providers: [
        FormControlService
        
    ]

})
export class FormBuilderModule { }

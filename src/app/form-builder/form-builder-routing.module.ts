import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublishedFormsGridComponent } from './components/published-forms-grid/published-forms-grid.component';
import { FormEditorComponent } from './components/form-editor/form-editor.component';
import { FormBuilderIndexComponent } from './components/form-builder-index.component';
import { FieldLibraryIndexComponent } from './components/field-library-index/field-library-index.component';

const routes: Routes = [
    {
        path: '', component: FormBuilderIndexComponent, children: [
            { path: '', redirectTo: 'form-editor', pathMatch:'full' },
            { path: 'published-forms', component: PublishedFormsGridComponent },
            { path: 'field-library', component: FieldLibraryIndexComponent },
            { path: 'form-editor', component: FormEditorComponent }
        ], 
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class FormBuilderRoutingModule { }

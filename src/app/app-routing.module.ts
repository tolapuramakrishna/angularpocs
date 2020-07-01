import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:() => import( './form-builder/form-builder.module').then(m => m.FormBuilderModule)},
  { path: "grid-controls", loadChildren:() => import( './dynamic-gird/dynamic-gird.module').then(m => m.DynamicGirdModule) },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

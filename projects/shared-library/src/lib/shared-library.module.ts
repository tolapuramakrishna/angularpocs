import { NgModule } from '@angular/core';
import { SharedLibraryComponent } from './shared-library.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SharedLibraryComponent],
  imports: [
    CommonModule
  ],
  exports: [SharedLibraryComponent]
})
export class SharedLibraryModule { }

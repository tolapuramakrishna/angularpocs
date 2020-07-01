import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibraryModule } from 'shared-library';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    AppRoutingModule,
 SharedLibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

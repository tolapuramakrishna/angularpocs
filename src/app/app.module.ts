import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SharedLibraryModule } from "shared-library";
import { SuperGridComponent } from './dynamic-grid/super-grid/super-grid.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from "@angular/forms";
//import { MatDropdownModule } from "ngx-mat-dropdown";

@NgModule({
  declarations: [AppComponent, SuperGridComponent, UserDetailsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedLibraryModule,
    FormsModule
  //  MatDropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

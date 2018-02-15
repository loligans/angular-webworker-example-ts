import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CdkTableModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

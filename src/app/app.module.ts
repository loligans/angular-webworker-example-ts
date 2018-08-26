import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { StringEvolverService } from './services/string-evolver.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  entryComponents: [AppComponent],
  providers: [StringEvolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }

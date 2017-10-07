import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdGridListModule, MdCardModule, MdToolbarModule, MdMenuModule, MdButtonModule,
  MdTooltipModule, MdSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { DateAxis } from './date-axis.component';

import { DeadApiService } from './dead-api.service';

@NgModule({
  declarations: [
    AppComponent,
    DateAxis
  ],
  imports: [
    BrowserModule,
    MdGridListModule,
    MdCardModule,
    MdToolbarModule,
    MdMenuModule,
    MdButtonModule,
    MdTooltipModule,
    MdSelectModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhBOyzthOjvWKAhax_o1clQYSdoSQIkd4'
    })
  ],
  providers: [DeadApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

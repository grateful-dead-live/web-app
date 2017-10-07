import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdGridListModule, MdCardModule, MdToolbarModule, MdMenuModule, MdButtonModule, MdTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
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
    BrowserAnimationsModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhBOyzthOjvWKAhax_o1clQYSdoSQIkd4'
    })
  ],
  providers: [DeadApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

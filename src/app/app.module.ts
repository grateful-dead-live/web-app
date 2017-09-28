import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdGridListModule, MdCardModule, MdToolbarModule, MdMenuModule, MdButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DeadApiService } from './dead-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MdGridListModule,
    MdCardModule,
    MdToolbarModule,
    MdMenuModule,
    MdButtonModule,
    BrowserAnimationsModule
  ],
  providers: [DeadApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdGridListModule, MdCardModule, MdToolbarModule, MdMenuModule, MdButtonModule,
  MdTooltipModule, MdSelectModule} from '@angular/material';
import { MdTabsModule } from '@angular/material/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { DateAxis } from './date-axis.component';
import { DeadApiService } from './dead-api.service';
import { DeadFeatureService } from './feature.service';

import { MdDialogModule } from '@angular/material';
import { DialogComponent } from './modal.component';
import { ReplaceUnderscores } from './app.stringFormatter';
import { DateFormatter } from './app.dateFormatter';

//import { DialogResultExample, DialogResultExampleDialog } from './modal.component';


@NgModule({

  entryComponents: [DialogComponent],

  declarations: [
    AppComponent,
    DateAxis,
    DialogComponent,
    ReplaceUnderscores,
    DateFormatter

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
    MdTabsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhBOyzthOjvWKAhax_o1clQYSdoSQIkd4'
    }),
    MdDialogModule
  ],
  providers: [DeadApiService,DeadFeatureService],
  bootstrap: [AppComponent]
})
export class AppModule { }

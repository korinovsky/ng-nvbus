import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { StopsComponent } from './stops/stops.component';
import { StopComponent } from './stop/stop.component';
import { StopService } from "./stop.service";

@NgModule({
  declarations: [
    AppComponent,
    StopsComponent,
    StopComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StopService],
  bootstrap: [AppComponent]
})
export class AppModule { }

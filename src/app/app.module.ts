import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StopsComponent} from './components/stops/stops.component';
import {StopComponent} from './components/stop/stop.component';
import {StopService} from "./services/stop.service";
import {TicketComponent} from './components/ticket/ticket.component';
import {HolidayService} from "./services/holiday.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import 'hammerjs';
import {
  MAT_DATE_LOCALE, MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatOptionModule, MatSelectModule, MatSidenavModule, MatTableModule, MatToolbarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {RouterModule, Routes} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

const appRoutes: Routes = [
  {path: '', component: StopsComponent},
  {path: 'ticket', component: TicketComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    StopsComponent,
    StopComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatOptionModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  providers: [StopService, HolidayService, CookieService,
    {provide: LOCALE_ID, useValue: 'ru-RU'},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

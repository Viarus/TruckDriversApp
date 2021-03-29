import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { InputDateAndTimeComponent } from './input-date-and-time/input-date-and-time.component';
import { DatePickerComponent } from './input-date-and-time/date-picker/date-picker.component';
import { TimePickerComponent } from './input-date-and-time/time-picker/time-picker.component';
import { OutputDataComponent } from './output-data/output-data.component';
import { GraphComponent } from './output-data/graph/graph.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TimePickerSecondComponent } from './input-date-and-time/time-picker-second/time-picker-second.component';
import { SummaryOfTheDayComponent } from './input-date-and-time/summary-of-the-day/summary-of-the-day.component';
import { ListOfAllDaysComponent } from './list-of-all-days/list-of-all-days.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoadingCircleComponent } from './shared/loading-circle/loading-circle/loading-circle.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes = [
  {path: "", redirectTo: "/input", pathMatch: "full"},
  {path: "login", component: AuthenticationComponent},
  {path: "register", component: AuthenticationComponent},
  {path: "input", component: InputDateAndTimeComponent},
  {path: "input", component: OutputDataComponent, outlet: 'secondary'},
  {path: "", component: OutputDataComponent, outlet: 'secondary'},
  {path: "list-of-days", component: ListOfAllDaysComponent}
];



/*import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

var config = {
  apiKey: "AIzaSyC9fDU4_cM0QL4e5oS_2qBBDDeglrYIxuA",
  authDomain: "truckapp-6433b.firebaseapp.com",
  projectId: "truckapp-6433b",
  storageBucket: "truckapp-6433b.appspot.com",
  messagingSenderId: "797184390532",
  appId: "1:797184390532:web:22cdaffe0f38c27154d9d1",
  measurementId: "G-2P4J278DQ2"
};
*/
@NgModule({
  declarations: [
    AppComponent,
    InputDateAndTimeComponent,
    DatePickerComponent,
    TimePickerComponent,
    OutputDataComponent,
    GraphComponent,
    TimePickerSecondComponent,
    SummaryOfTheDayComponent,
    ListOfAllDaysComponent,
    AuthenticationComponent,
    LoadingCircleComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
    //AngularFireModule.initializeApp(config),
    //AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

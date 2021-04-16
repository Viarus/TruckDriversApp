import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { ListOfAllDaysComponent } from './list-of-all-days/list-of-all-days.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoadingCircleComponent } from './shared/loading-circle/loading-circle/loading-circle.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AuthGuard } from './authentication/authentication.guard';
import { UnAuthGuard } from './authentication/unauthentication.guard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


const appRoutes: Routes = [
  { path: "", redirectTo: "/input", pathMatch: "full" },
  { path: "login", component: AuthenticationComponent, canActivate: [UnAuthGuard] },
  { path: "register", component: AuthenticationComponent },
  {
    path: "input", component: InputDateAndTimeComponent, children: [
      { path: "", component: OutputDataComponent },
    ]
  },
  { path: "list-of-days", component: ListOfAllDaysComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    InputDateAndTimeComponent,
    DatePickerComponent,
    TimePickerComponent,
    OutputDataComponent,
    GraphComponent,
    TimePickerSecondComponent,
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
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

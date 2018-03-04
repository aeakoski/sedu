import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { TeacherDashComponent } from './teacher-dash/teacher-dash.component';
import { TeacherServiceService } from './teacher-service.service';
import { AuthService } from './auth.service';
import { StudentDashComponent } from './student-dash/student-dash.component';
import { TeacherGuard, StudentGuard } from './guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TeacherDashComponent,
    StudentDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    TeacherServiceService,
    AuthService,
    TeacherGuard,
    StudentGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

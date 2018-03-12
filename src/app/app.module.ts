import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { TeacherServiceService } from './teacher-service.service';
import { StudentServiceService } from './student-service.service';
import { AuthService } from './auth.service';
import { TeacherGuard, StudentGuard } from './guard.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TeacherDashComponent } from './teacher-dash/teacher-dash.component';
import { StudentDashComponent } from './student-dash/student-dash.component';

import { AppRoutingModule } from './app-routing.module';
import { StudentPartComponent } from './student-part/student-part.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TeacherDashComponent,
    StudentDashComponent,
    StudentPartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule

  ],
  providers: [
    TeacherServiceService,
    StudentServiceService,
    AuthService,
    TeacherGuard,
    StudentGuard,
    Cookie
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }

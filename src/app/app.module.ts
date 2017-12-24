import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { TeacherDashComponent } from './teacher-dash/teacher-dash.component';
import { TeacherServiceService } from './teacher-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TeacherDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

  ],
  providers: [TeacherServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

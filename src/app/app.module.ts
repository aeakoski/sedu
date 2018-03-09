import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TeacherServiceService } from './teacher-service.service';
import { AuthService } from './auth.service';
import { TeacherGuard, StudentGuard } from './guard.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TeacherDashComponent } from './teacher-dash/teacher-dash.component';
import { StudentDashComponent } from './student-dash/student-dash.component';

//import { AppRoutingModule } from './app-routing.module';

console.log('Imports done')
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'teacher',
    component: TeacherDashComponent,
    canActivate: [TeacherGuard]
  },
  { path: 'student',
    component: StudentDashComponent,
    canActivate: [StudentGuard]
  }

];
console.log("Routes done")

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
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)

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

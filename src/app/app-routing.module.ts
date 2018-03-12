import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { TeacherDashComponent } from './teacher-dash/teacher-dash.component';
import { StudentDashComponent } from './student-dash/student-dash.component';
import { TeacherGuard, StudentGuard } from './guard.guard'
import { StudentPartComponent } from './student-part/student-part.component'

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'teacher',
    component: TeacherDashComponent,
    canActivate: [TeacherGuard]
  },
  { path: 'student',
    component: StudentDashComponent,
    canActivate: [StudentGuard],
    children: [
      {path: 'part/:section_id', component: StudentPartComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports:[RouterModule],
  providers:[TeacherGuard, StudentGuard]
})
export class AppRoutingModule { }

import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private Auth: AuthService, private router:Router) {
    console.log("Student Guard initialized!")
  }
  canActivate(){
    if(this.Auth.get_isLoggedIn() && !this.Auth.get_isTeacher()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(private Auth: AuthService, private router:Router) { }
  canActivate(){
    if(this.Auth.get_isLoggedIn() && this.Auth.get_isTeacher()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}

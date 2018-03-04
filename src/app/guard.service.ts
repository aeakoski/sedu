import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import {Router} from '@angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class StudentGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router) {}

  canActivate(){
    if(this.authService.get_isLoggedIn() && !this.authService.get_isTeacher()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router) {}
  console.log("Todelooo")
  canActivate(){
    if(this.authService.get_isLoggedIn() && this.authService.get_isTeacher()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }

  }
}

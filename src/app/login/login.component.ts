import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    constructor(private Auth:AuthService, private RR:Router) {
      console.log("LoginComponent created")

      // If i am logged in, redirect me to that page
      if(this.Auth.get_isLoggedIn()){
        (this.Auth.get_isTeacher()) ? RR.navigate(['teacher']) : RR.navigate(['student'])
      }
    }

  signIn(name, pass){
    console.log("In login-controller")

    this.Auth.signIn(name, pass).then(
      (success) => {
        console.log(success);
        if(success === "teacher"){
          this.RR.navigate(['teacher']);
        }else if (success === "student"){
          this.RR.navigateByUrl('/student');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

}

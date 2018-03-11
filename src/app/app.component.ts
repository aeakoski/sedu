import { Component } from '@angular/core';
import { section } from './section';
import { AuthService } from './auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})

export class AppComponent {
  constructor(private Auth:AuthService, private Router:Router){
    console.log("App Component Created")
  }

  signOut(){
    this.Auth.signOut();
    this.Router.navigate(['/login']);
  }
}

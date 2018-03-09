import { Component } from '@angular/core';
import { section } from './section';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})

export class AppComponent {
  constructor(private Auth:AuthService){
    console.log("App Component Created")
  }
  title = 'app';
}

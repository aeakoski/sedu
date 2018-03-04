import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http:Http, private router:Router) { }

  private username:string;
  private first_name:string;
  private last_name:string;
  private isTeacher:boolean = false;
  private isLoggedIn:boolean = false;
  private token:string;

  get_isLoggedIn(){ return this.isLoggedIn; }
  get_isTeacher(){ return this.isTeacher; }

  ping(){
    console.log("Ping");
  }

  signIn(username, password){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let values = {
      username:username,
      password:password
    };
    const postReq = this.http.post(
      "http://localhost:4444/api/auth",
      values,
      options
    );
    postReq.subscribe( (res3:any)=>{
      res3 = res3.json();
      console.log(res3);
      if(!res3.error){
        this.isLoggedIn = true;
        this.username = res3.username;
        this.first_name = res3.first_name;
        this.last_name = res3.last_name;
        this.token = res3.token;
        this.isTeacher = res3.isTeacher;
        console.log("isTeacher from response" + res3.isTeacher)
        if(res3.isTeacher){
          this.router.navigateByUrl('/teacher');
        }else{
          this.router.navigateByUrl('/student');
        }
      }
    } );
  }

}

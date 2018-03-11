import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthService {

  constructor(private http:Http, private Cookies: Cookie) {
    console.log("Auth service initialized!")
    this.signInFromCookie()
  }

  private username:string;
  private first_name:string;
  private last_name:string;
  private isTeacher:boolean;
  private isLoggedIn:boolean;
  private token:string;

  get_isLoggedIn(){ return this.isLoggedIn }
  get_isTeacher(){ return this.isTeacher }
  get_token(){ return this.token }

  ping(){
    console.log("Ping");
  }

  refreshToken(){
    return new Promise(
      (resolve, reject) => {
        const req = this.http.get("http://localhost:4444/api/" + "refresh?token=" + this.token.replace('.', '%2E'));
        req.subscribe(
          (res)=>{
            this.token = (<any>res)._body
            Cookie.set('token', this.token, 1 /*days from now*/);
            resolve("success")
          },
          (err)=>{
            reject("fail")
          }
        );
      }
    )
  }

  signOut(){
    Cookie.delete('isTeacher');
    Cookie.delete('last_name');
    Cookie.delete('first_name');
    Cookie.delete('username');
    Cookie.delete('token');

    this.isLoggedIn = false;
    this.username = undefined;
    this.first_name = undefined;
    this.last_name = undefined;
    this.token = undefined;
    this.isTeacher = false;
  }

  signInFromCookie(){
    let token = Cookie.get('token');
    if (token){
      this.isLoggedIn = true;
      this.username = Cookie.get('username');
      this.first_name = Cookie.get('first_name');
      this.last_name = Cookie.get('last_name');
      this.token = token;
      this.isTeacher = Cookie.get('isTeacher') === "true";
    }
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

    return new Promise(
      (resolve, reject) => {
        postReq.subscribe(
          (res3:any)=>{
            res3 = res3.json();
            if(res3.error){ reject('error'); return; }
            this.isLoggedIn = true;
            this.username = res3.username;
            this.first_name = res3.first_name;
            this.last_name = res3.last_name;
            this.token = res3.token;
            this.isTeacher = res3.isTeacher;

            Cookie.set('username', res3.username, 1 /*days from now*/);
            Cookie.set('first_name', res3.first_name, 1 /*days from now*/);
            Cookie.set('last_name', res3.last_name, 1 /*days from now*/);
            Cookie.set('isTeacher', res3.isTeacher, 1 /*days from now*/);
            Cookie.set('token', res3.token, 1 /*days from now*/);

            if(res3.isTeacher){
              resolve('teacher')
            }else{
              resolve('student')
            }
          }
        );
      }
    );
  }
}

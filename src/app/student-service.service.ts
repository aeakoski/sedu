import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

import {AuthService } from './auth.service'

import { section } from './section'
import { part } from './part'
import { question } from './question'

@Injectable()
export class StudentServiceService {
  private website_api = "http://localhost:4444/api/";
  public section: any;
  public parts: any;

  constructor(private http: Http, private Auth: AuthService) {
    this.getSections();
  }

  getSections(){
    const req = this.http.get(this.website_api + "section" + "?token=" + this.Auth.get_token().replace('.', '%2E'));
    req.subscribe(
      (res)=>{
        console.log(res.json());
        this.section = res.json();
      }
    );
  }

}

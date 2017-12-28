import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

import { section } from './section'
import { part } from './part'
import { question } from './question'

import { SECTIONS } from './mock-sections'

@Injectable()
export class TeacherServiceService {
  private website_api = "http://localhost:4444/api/";
  public section: any;
  public part: any;

  constructor(private http: Http) { }

  getSections(){
    const req = this.http.get(this.website_api + "section");
    req.subscribe(
      (res)=>{
        console.log(res.json());
        this.section = res.json();
      }
    );

    //return SECTIONS;
  }

  getParts(sectionid){
    const req = this.http.get(this.website_api + "part?sectionid=" + sectionid);
    req.subscribe(
      (res)=>{
        console.log(res.json());
        this.part = res.json();
      }
    );
  }

  createNewPart(values){
    return 0;
  }

  createNewSection(values){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    const postReq = this.http.post(
      "http://localhost:4444/api/section",
      values,
      options
    );
    postReq.subscribe( (res3)=>{ } );

  };
};

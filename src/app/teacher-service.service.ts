import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

import { section } from './section'
import { part } from './part'
import { question } from './question'

import { SECTIONS } from './mock-sections'

@Injectable()
export class TeacherServiceService {

  constructor(private http: Http) { }
  getSections(){
    return SECTIONS;
  }

  createNewPart(values){
    return 0;
  }

  createNewSection(values){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    const postReq = this.http.post(
      "http://localhost:4444/api/new/section",
      values,
      options
    );
    postReq.subscribe( (res3)=>{ } );

  };
};

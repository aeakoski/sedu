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
  }

  editSection(section){
    console.log(section);
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const postReq = this.http.put(
      "http://localhost:4444/api/section",
      section,
      options
    );
    postReq.subscribe( (res3)=>{ } );
  }

  editPart(part){
    console.log(part)
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let video_id = part.video.split("=")
    if (video_id.length != 2){
      //TODO Throw error
      console.log("FUUUUUUU!");
    }
    part.video = video_id[1];
    const postReq = this.http.put(
      "http://localhost:4444/api/part",
      part,
      options
    );
    postReq.subscribe( (res3)=>{ } );
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
  }

  createNewPart(part){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let video_id = part.video.split("=")
    if (video_id.length != 2){
      //TODO Throw error
      console.log("FUUUUUUU!");
    }
    part.video = video_id[1];
    console.log(part);
    console.log("Sending post to api/part");
    const postReq = this.http.post(
      "http://localhost:4444/api/part",
      part,
      options
    );
    postReq.subscribe( (res3)=>{ } );
  }

}

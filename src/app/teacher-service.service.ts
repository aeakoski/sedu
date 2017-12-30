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
  public parts: any;

  constructor(private http: Http) { }

  /* ---------------- Getters -----------------*/

  getSections(){
    const req = this.http.get(this.website_api + "section");
    req.subscribe(
      (res)=>{
        console.log(res.json());
        this.section = res.json();
      }
    );
  }

  getParts(sectionid){
    console.log("getting parts")
    const req = this.http.get(this.website_api + "part?sectionid=" + sectionid);
    req.subscribe(
      (res)=>{
        console.log(res.json());
        this.parts = res.json();

        for(let i = 0; i<this.parts.length; i++){
            this.parts[i].question = [];
            this.parts[i].exam = [];
            this.http.get(this.website_api + "question?isexam=" + 0 + "&id="+ this.parts[i].part_id)
            .subscribe(
              (res)=>{
                console.log(res.json().length)
                for(let j=0; j < res.json().length; j++){
                  if(res.json()[j].isexam){
                    console.log("isexam");
                      this.parts[i].exam.push(res.json()[j]);
                  }else{
                    console.log("isexam - NOT");
                      this.parts[i].question.push(res.json()[j]);
                  }
                }
            }
          );
        }
      }
    );
  }

  getQuestions(isExam, id){
    const req = this.http.get(this.website_api + "question?isexam=" + isExam + "&id="+ id);
    req.subscribe(
      (res)=>{
        //console.log(res.json());
        return res.json();
      }
    );
  }

  /* ---------------- Editers -----------------*/

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

  editQuestion(isExam, id, values){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    values.isexam = isExam;
    values.question_id = id;
    console.log(values);
    const postReq = this.http.put(
      "http://localhost:4444/api/question",
      values,
      options
    );
    postReq.subscribe( (res3)=>{ } );
  }

  /* ---------------- Creates -----------------*/

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

  newQuestion(isExam, part_id, values){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    values.isexam = isExam;
    values.part_id = part_id;
    console.log(values);
    const postReq = this.http.post(
      "http://localhost:4444/api/question",
      values,
      options
    );
    postReq.subscribe( (res3)=>{ } );
  }


  /* ---------------- Removes -----------------*/

  removeQuestion(id){
    console.log("removing " + id)
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const postReq = this.http.delete(
      "http://localhost:4444/api/question?id="+id,
      options
    );
    postReq.subscribe( (res3)=>{ } );
  }


}

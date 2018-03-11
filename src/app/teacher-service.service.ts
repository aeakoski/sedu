import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

import {AuthService } from './auth.service'

import { section } from './section'
import { part } from './part'
import { question } from './question'

@Injectable()
export class TeacherServiceService {
  private website_api = "http://localhost:4444/api/";
  public section: any;
  public parts: any;
  private firstTime: Boolean = true;

  constructor(private http: Http, private Auth: AuthService) { }

  /* ---------------- Getters -----------------*/

  getSections(){
    let req = this.http.get(this.website_api + "section" + "?token=" + this.Auth.get_token().replace('.', '%2E'));
    req.subscribe(
      (res)=>{
        this.section = res.json();
        this.firstTime = true;
      },
      (err)=>{
        if (err.status == 401 && this.firstTime){
          this.Auth.refreshToken().then(
            (success) => { this.getSections() },
            (err) => { console.log(err) }
          );
          this.firstTime = false;
        }
      }
    );
  }

  getParts(sectionid){
    console.log("getting parts")
    const req = this.http.get(this.website_api + "part?sectionid=" + sectionid + "&token=" + this.Auth.get_token().replace('.', '%2E'));
    req.subscribe(
      (res)=>{
        console.log(res.json());
        this.parts = res.json();
        this.firstTime = true;

        for(let i = 0; i<this.parts.length; i++){
            this.parts[i].question = [];
            this.parts[i].exam = [];
            this.http.get(this.website_api + "question?isexam=" + 0 + "&id="+ this.parts[i].part_id + "&token=" + this.Auth.get_token().replace('.', '%2E'))
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
      },
      (err)=>{
        if (err.status == 401 && this.firstTime){
          this.Auth.refreshToken().then(
            (success) => { this.getParts(sectionid) },
            (err) => { console.log(err) }
          );
          this.firstTime = false;
        }
      }
    );
  }

  getQuestions(isExam, id){
    const req = this.http.get(this.website_api + "question?isexam=" + isExam + "&id="+ id + "&token=" + this.Auth.get_token().replace('.', '%2E'));
    req.subscribe(
      (res)=>{
        this.firstTime = true;
        return res.json();
      },
      (err)=>{
        if (err.status == 401 && this.firstTime){
          this.Auth.refreshToken().then(
            (success) => { this.getQuestions(isExam, id) },
            (err) => { console.log(err) }
          );
          this.firstTime = false;
        }
      }
    );
  }

  /* ---------------- Editers -----------------*/

  editSection(section){
    section.token = this.Auth.get_token()
    console.log(section);
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const postReq = this.http.put(
      "http://localhost:4444/api/section",
      section,
      options
    );
    postReq.subscribe(
      (res3)=>{ this.firstTime = true; },
      (err)=>{
        if (err.status == 401 && this.firstTime){
          this.Auth.refreshToken().then(
            (success) => { this.editSection(section) },
            (err) => { console.log(err) }
          );
          this.firstTime = false;
        }
      }
    );
  }

  editPart(part){
    console.log(part)
    part.token = this.Auth.get_token()
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
    postReq.subscribe(
      (res3)=>{ this.firstTime = true; },
      (err)=>{
        if (err.status == 401 && this.firstTime){
          this.Auth.refreshToken().then(
            (success) => { this.editPart(part) },
            (err) => { console.log(err) }
          );
          this.firstTime = false;
        }
      } );
  }

  editQuestion(isExam, id, values){
    values.token = this.Auth.get_token()
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
    postReq.subscribe(
      (res3)=>{ this.firstTime = true; },
      (err)=>{
        if (err.status == 401 && this.firstTime){
          this.Auth.refreshToken().then(
            (success) => { this.editQuestion(isExam, id, values) },
            (err) => { console.log(err) }
          );
          this.firstTime = false;
        }
      } );
  }

  /* ---------------- Creates -----------------*/

  createNewSection(values){
    values.token = this.Auth.get_token()
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const postReq = this.http.post(
      "http://localhost:4444/api/section",
      values,
      options
    );
    postReq.subscribe( (res3)=>{ this.firstTime = true; },
    (err)=>{
      if (err.status == 401 && this.firstTime){
        this.Auth.refreshToken().then(
          (success) => { this.createNewSection(values) },
          (err) => { console.log(err) }
        );
        this.firstTime = false;
      }
    } );
  }

  createNewPart(part){
    part.token = this.Auth.get_token()
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let video_id = part.video.split("=")
    if (video_id.length != 2){
      //TODO Throw error
      console.log("Not a valid youtube URL");
    }
    part.video = video_id[1];
    console.log(part);
    console.log("Sending post to api/part");
    const postReq = this.http.post(
      "http://localhost:4444/api/part",
      part,
      options
    );
    postReq.subscribe( (res3)=>{
      this.firstTime = true;
      this.getParts(part.section_id)
    },
    (err)=>{
      if (err.status == 401 && this.firstTime){
        this.Auth.refreshToken().then(
          (success) => { this.createNewPart(part) },
          (err) => { console.log(err) }
        );
        this.firstTime = false;
      }
    } );
  }

  newQuestion(isExam, part_id, values){
    values.token = this.Auth.get_token()
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    values.isexam = isExam;
    values.part_id = part_id;
    console.log("Create new question")
    console.log(values);
    const postReq = this.http.post(
      "http://localhost:4444/api/question",
      values,
      options
    );
    postReq.subscribe( (res3)=>{ this.firstTime = true; },
    (err)=>{
      if (err.status == 401 && this.firstTime){
        this.Auth.refreshToken().then(
          (success) => { this.newQuestion(isExam, part_id, values) },
          (err) => { console.log(err) }
        );
        this.firstTime = false;
      }
    } );
  }


  /* ---------------- Removes -----------------*/

  removeQuestion(id){
    console.log("removing " + id)
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const postReq = this.http.delete(
      "http://localhost:4444/api/question?id=" + id + "&token=" + this.Auth.get_token().replace('.', '%2E'),
      options
    );
    postReq.subscribe( (res3)=>{ this.firstTime = true; },
    (err)=>{
      if (err.status == 401 && this.firstTime){
        this.Auth.refreshToken().then(
          (success) => { this.removeQuestion(id) },
          (err) => { console.log(err) }
        );
        this.firstTime = false;
      }
    } );
  }

  removePart(id){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const postReq = this.http.delete(
      "http://localhost:4444/api/part?id=" + id + "&token=" + this.Auth.get_token().replace('.', '%2E'),
      options
    );
    postReq.subscribe( (res3)=>{ this.firstTime = true; },
    (err)=>{
      if (err.status == 401 && this.firstTime){
        this.Auth.refreshToken().then(
          (success) => { this.removePart(id) },
          (err) => { console.log(err) }
        );
        this.firstTime = false;
      }
    });
  }

  removeSection(id){
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    const postReq = this.http.delete(
      "http://localhost:4444/api/section?id=" + id + "&token=" + this.Auth.get_token().replace('.', '%2E'),
      options
    );
    postReq.subscribe( (res3)=>{ this.firstTime = true; },
    (err)=>{
      if (err.status == 401 && this.firstTime){
        this.Auth.refreshToken().then(
          (success) => { this.removeSection(id) },
          (err) => { console.log(err) }
        );
        this.firstTime = false;
      }
    });
  }


}

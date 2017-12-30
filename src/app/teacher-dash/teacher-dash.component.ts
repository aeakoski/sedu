import { Component, OnInit } from '@angular/core';
import { TeacherServiceService } from '../teacher-service.service'
//import { FormBuilder, Validators } from '@angular/forms';

//import { Pipe, PipeTransform } from '@angular/core';
//import { DomSanitizer} from '@angular/platform-browser';
import {DomSanitizer} from "@angular/platform-browser";

//import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Component({
  selector: 'app-teacher-dash',
  templateUrl: './teacher-dash.component.html',
  styleUrls: ['./teacher-dash.component.css'],
  providers: [TeacherServiceService]
})

export class TeacherDashComponent implements OnInit {
  public sections:any;
  private section_fullscreen=false;//false;
  private section_edit=false;
  private hasUpdated = false;
  private full_video_url:string;

  private active_section=1;//-1;
  private active_section_name = "Luftrum på kartan";//"";
  private active_section_desc = "Luften är inte fri. På kartan ser vi massor med färgranna rutor. Vad innebär dessa? Det kommer vi lära oss här!";//"";
  private active_section_id = "1";//"";
  private editName:string;

  private newRegularFields=[0];
  private newExamFields=[0];

  constructor(private Teacher:TeacherServiceService, private domSanitizer : DomSanitizer){//, private fb: FormBuilder) {
    Teacher.getSections();
  }

  makeLink(id){
    return this.domSanitizer.bypassSecurityTrustResourceUrl("http://www.youtube.com/embed/" + id);
  }

  setActiveSection(section){
    this.active_section_name = section.name;
    this.active_section_desc = section.description;
    this.active_section_id = section.section_id;
    this.section_fullscreen = true;
    this.Teacher.getParts(section.section_id);
  }

  compose_video_url(id){
    this.full_video_url = "https://www.youtube.com/watch?v="+id;
  }

  createNewSection(values){
    //console.log(values);
    this.Teacher.createNewSection(values);

  };
  createNewPart(values){
    //console.log(values);
    this.Teacher.createNewPart(values);
  };

  ngOnInit() {
  }

}

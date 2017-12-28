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
  private section_edit:boolean;
  private active_section:-1;

  constructor(private Teacher:TeacherServiceService, private domSanitizer : DomSanitizer){//, private fb: FormBuilder) {
    this.section_edit = false;
    //console.log(Teacher.getSections())
    Teacher.getSections();
    //this.sections = Teacher.section;
    //Teacher.section.subscribe(sections => {
      //this.sections = sections;
    //});
  }

  makeLink(id){
    return this.domSanitizer.bypassSecurityTrustResourceUrl("http://www.youtube.com/embed/" + id);
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

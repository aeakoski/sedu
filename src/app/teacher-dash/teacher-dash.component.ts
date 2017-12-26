import { Component, OnInit } from '@angular/core';
import { TeacherServiceService } from '../teacher-service.service'
//import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-teacher-dash',
  templateUrl: './teacher-dash.component.html',
  styleUrls: ['./teacher-dash.component.css'],
  providers: [TeacherServiceService]

})
export class TeacherDashComponent implements OnInit {


  public selections:any;
  /*public sectionForm = this.fb.group({
    name: [""],
    description: [""]
  });
  public partForm = this.fb.group({
    name: [""],
    description: [""],
    videourl: [""]
  });*/
  constructor(private Teacher:TeacherServiceService){//, private fb: FormBuilder) {
    console.log(Teacher.getSections())
    this.selections = Teacher.getSections();
  }

  createNewSection(values){
    console.log(values);
    this.Teacher.createNewSection(values);
  };
  createNewPart(values){
    console.log(values);
    this.Teacher.createNewPart(values);
  };

  ngOnInit() {
  }

}

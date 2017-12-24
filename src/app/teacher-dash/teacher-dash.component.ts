import { Component, OnInit } from '@angular/core';
import { TeacherServiceService } from '../teacher-service.service'


@Component({
  selector: 'app-teacher-dash',
  templateUrl: './teacher-dash.component.html',
  styleUrls: ['./teacher-dash.component.css'],
  providers: [TeacherServiceService]

})
export class TeacherDashComponent implements OnInit {

//importera sections här nuuuuuuu!
  selections:any;
  constructor(private Teacher:TeacherServiceService) {
    console.log(Teacher.getSections())
    this.selections = Teacher.getSections();
  }

  ngOnInit() {
  }

}

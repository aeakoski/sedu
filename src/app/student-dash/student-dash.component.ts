import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../student-service.service'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.css']
})
export class StudentDashComponent implements OnInit {

  constructor(private Student: StudentServiceService) { }

  ngOnInit() {
  }

}

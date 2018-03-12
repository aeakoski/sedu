import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentServiceService } from '../student-service.service'

@Component({
  selector: 'app-student-part',
  templateUrl: './student-part.component.html',
  styleUrls: ['./student-part.component.css']
})
export class StudentPartComponent implements OnInit {
  private id: number;
  constructor(private Student: StudentServiceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe( (params) =>{
      console.log(params['section_id'])
        this.id = params['section_id'];
      }
    )
  }
}

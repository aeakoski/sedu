import { Injectable } from '@angular/core';

import { section } from './section'
import { part } from './part'
import { question } from './question'

import { SECTIONS } from './mock-sections'

@Injectable()
export class TeacherServiceService {

  constructor() { }
  getSections(){
    return SECTIONS;
  }
}

import { question } from './question'

export class part{
    section:string;
    name:string;
    description:string;
    videoURL:string;
    prepQuestions:question[]; //List of question objects
    examQuestions:question[];
}

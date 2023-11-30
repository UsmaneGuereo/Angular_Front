import { Component, OnInit } from '@angular/core';
import { Student } from 'src/models/student';
import { StudentService } from 'src/services/ticket/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public studentList: Student[] = [];

  constructor(public studentService: StudentService, ) { 
    this.studentService.student$.subscribe((students) => this.studentList = students);
  }

  ngOnInit() {
    this.studentService.getStudent().then((result) => {
      this.studentList = result;
      this.studentService.student$.next(this.studentList);
    }).catch((err) => {
      console.error("Erreur de recuperation des donnees " + err);
    });
  }

}

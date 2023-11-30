import { Component, OnInit } from '@angular/core';
import { Student } from 'src/models/student';
import { StudentService } from 'src/services/ticket/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public studentList: Student[] = [];

  constructor(public studentService: StudentService) { 
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

  suppUser(id: number) {
    this.studentService.deleteStudent(id).then(() => {
      this.studentList = this.studentList.filter(st => st.id !== id);
      this.studentService.student$.next(this.studentList);
    }).catch((err) => {
      console.error("Erreur de suppression " + err);
    });
  }

}

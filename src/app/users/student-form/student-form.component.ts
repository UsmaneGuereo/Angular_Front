import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from 'src/models/student';
import { StudentService } from 'src/services/ticket/student.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  public userForm: FormGroup;
  public studentList: Student[] = [];

  constructor(public formBuilder: FormBuilder, public studentService: StudentService, public location: Location, public router: Router) { 
    this.userForm = this.formBuilder.group({
      prenom: [''],
      nom: ['']
    });
    this.studentService.student$.subscribe((students) => this.studentList = students);
  }

  ngOnInit() {
  }

  addUser() {
    const userToCreate: Student = this.userForm.getRawValue() as Student;
    userToCreate.id = Date.now();
    this.studentService.createStudent(userToCreate);
    this.studentList.push(userToCreate);
    this.studentService.student$.next(this.studentList);
    this.userForm.removeControl('prenom');
    this.userForm.removeControl('nom');
    console.log(userToCreate);
  }

}

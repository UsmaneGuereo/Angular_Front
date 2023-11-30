import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Ticket } from '../../../models/ticket';
import { StudentService } from 'src/services/ticket/student.service';
import { STUDENTS_MOCKED } from 'src/mocks/tickets.mock';
import { Student } from 'src/models/student';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)
  /**
   * TicketForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms
   */
  public ticketForm: FormGroup;
  MAJORLIST: String[] = ["SI", "GE", "GB"];
  // public studentList: Student[] = STUDENTS_MOCKED;
  public studentList: Student[];

  constructor(public formBuilder: FormBuilder, public ticketService: TicketService, public studentService: StudentService) {
    // Form creation
    this.ticketForm = this.formBuilder.group({
      title: [''],
      description: [''],
      major: [''],
      student: ['']
    });
    
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
    // this.studentService.student$.subscribe((student) => {
    //   this.studentList = student;
    //   this.studentService.student$.next(this.studentList);
    // });
    this.studentService.getStudent().then((result) => {
      this.studentList = result;
      this.studentService.student$.next(this.studentList);
    }).catch((err) => {
      console.log("Erreur lors de la recuperation des donnees");
    });
  }

  addTicket() {
    const ticketToCreate: Ticket = this.ticketForm.getRawValue() as Ticket;
    ticketToCreate.date = new Date();
    ticketToCreate.archived = false;
    let val: Student = this.ticketForm.getRawValue();
    let idStudent = val['student'];
    // ticketToCreate.student = this.studentList.find(st => st.id === idStudent);
    this.studentService.getOneStudent(idStudent).then((result) => {
      ticketToCreate.student = result;
      // console.log(ticketToCreate.student);
      this.ticketService.addTicket(ticketToCreate);
    }).catch((err) => {
      console.log("Erreur lors de la recuperation d'un etudiant: "+ err)
    });

    
    // this.ticketService.addTicket(ticketToCreate);
  }

}

import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket/ticket.service';
import { Ticket } from '../../../models/ticket';
import { StudentService } from 'src/services/ticket/student.service';
import { Student } from 'src/models/student';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  public ticketList: Ticket[] = [];
  public studentList: Student[] = [];

  public displayTicketArchived: boolean = false;

  constructor(public ticketService: TicketService, public studentService: StudentService) {
    this.ticketService.tickets$.subscribe((tickets) => this.ticketList = tickets);
  }

  ngOnInit() {
    this.studentService.getStudent().then((result) => {
      this.studentList = result;
      this.studentService.student$.next(this.studentList);
    }).catch((err) => {
      console.error("Erreur de recuperation des donnees");
    });
  }

  ticketHasBeenSelected(hasBeenSelected: boolean) {
    console.log('event received from child:', hasBeenSelected);
  }

  deleteTicket(ticket: Ticket) {
    this.ticketService.deleteTicket(ticket);
    console.log('ticket suppime:', ticket);
  }

  updateArchivedList(state: boolean) {
        
    if (this.displayTicketArchived) {
      this.displayTicketArchived = false;
      document.getElementById('updateListButton').textContent = "Afficher tickets archives";
    } else {
      this.displayTicketArchived = true;
      document.getElementById('updateListButton').textContent = "Masquer tickets archives";
    }
    state = this.displayTicketArchived;
    this.ticketService.updateArchivedList(state);
  }

}

import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TICKETS_MOCKED } from '../../mocks/tickets.mock';
import { BehaviorSubject } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
  */

  private ticketList: Ticket[] = TICKETS_MOCKED;

  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
  */
  public tickets$: BehaviorSubject<Ticket[]> = new BehaviorSubject(this.ticketList);

  constructor() {
  }

  addTicket(ticket: Ticket) {
    const dateToday: Date = new Date();
    const elts = {
      title: ticket.title,
      description: ticket.description,
      date: dateToday,
      student: {
        id: ticket.student.id,
        prenom: ticket.student.prenom,
        nom: ticket.student.nom
      },
      major: ticket.major,
      archived: false,
    };

    this.ticketList.push(elts);
    this.tickets$.next(this.ticketList);
    // You need here to update the list of ticket and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  }

  deleteTicket(ticket: Ticket) {
    // this.ticketList = this.ticketList.filter(t => t !== ticket); //Supp ticket
    // const index = this.ticketList.indexOf(ticket); //Supp ticket
    // console.log('index ticket ', index)
    // if (index !== -1) {
    //   this.ticketList.splice(index,1);
    // }
    ticket.archived = ticket.archived ? false : true;
    // ticket.archived = true;               // Archiver ticket
    this.tickets$.next(this.ticketList);
    console.log(ticket);
  }

  updateArchivedList(state: boolean) {
    let temp = this.ticketList;
    if (state) {
      temp = this.ticketList.filter(t => t.archived === true);
    } else {
      temp = this.ticketList.filter(t => t.archived === false);
    }
    this.tickets$.next(temp);
  }
  
}

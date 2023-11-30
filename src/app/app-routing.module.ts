import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router'
import { TicketComponent, TicketFormComponent, TicketListComponent } from './tickets';
import { TicketIndexComponent } from './ticket-index/ticket-index.component';
import { StudentComponent } from './users/student/student.component';

const routes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: 'tickets', component: TicketIndexComponent },
  // Ajoutez d'autres routes si nécessaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }

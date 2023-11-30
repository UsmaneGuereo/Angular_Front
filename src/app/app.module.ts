import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TicketComponent, TicketFormComponent, TicketListComponent } from './tickets';
import { TicketService } from '../services/ticket/ticket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { TicketIndexComponent } from './ticket-index/ticket-index.component';
import { StudentFormComponent } from './users/student-form/student-form.component';
import { StudentComponent } from './users/student/student.component';
import { FormsModule } from '@angular/forms';
import { StudentListComponent } from './users/student-list/student-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TicketComponent,
    TicketFormComponent,
    TicketListComponent,
    HeaderComponent,
    TicketIndexComponent,
    StudentFormComponent,
    StudentComponent,
    StudentListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Import all dependencies
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TicketService], // All the services need to be provided
  bootstrap: [AppComponent]
})
export class AppModule {
}

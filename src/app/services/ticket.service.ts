import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http : HttpClient) { }

  readonly baseURL = 'http://localhost:3000/tickets';


  addTicket(ticket: Ticket) : Observable<any> {
    return this.http.post(this.baseURL, ticket);
  }

}

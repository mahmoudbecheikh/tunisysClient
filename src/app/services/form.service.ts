import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/models/ticket';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:3000/tickets';

  ajouterTicket(ticket: any): Observable<any> {
    return this.http.post('http://localhost:3000/tickets', ticket);
  }

  listDepatemtent(): Observable<any> {
    return this.http.get('http://localhost:3000/departements');
  }

  uploadFiles(data: any) {
    return this.http.post('http://localhost:3000/tickets/fichiers', data);
  }

  afficherParJeton(token: any): Observable<any> {
    return this.http.get(this.baseURL + `/avis/${token}`);
  }

  envoyerAvis(feedBack: any, token: any) {
    return this.http.post(
      'http://localhost:3000/tickets/avis' + `/${token}`,
      feedBack
    );
  }
}

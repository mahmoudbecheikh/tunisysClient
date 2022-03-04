import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  service? : string ; 
  myForm: FormGroup = new FormGroup({});
  subject: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  clientEmail: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(".*com$")
  ]);
  clientFullName: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  clientTel: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[234579][0-9]*$'),
  ]);

  manual: FormControl = new FormControl('Client');

  constructor(private ticketService : TicketService,private router : Router,  private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.service = this.activateRoute.snapshot.params['service'] ;
    this.createForm();
  }

  createForm() {
    this.myForm = new FormGroup({
      subject: this.subject,
      clientEmail: this.clientEmail,
      clientFullName: this.clientFullName,
      clientTel: this.clientTel,
      description: this.description,
      manual: this.manual

    });
  }
  
  returnToList() {
    this.router.navigate(['/']);
  }
  onSubmit() {
    this.ticketService.addTicket(this.myForm.value).subscribe((res) => {
      this.router.navigate(['/']);
    });
  }



}

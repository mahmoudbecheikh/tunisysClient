import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/models/departement';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  departements : Departement[]= []
  myForm: FormGroup = new FormGroup({});

  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  departement : FormControl = new FormControl('',Validators.required)
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(".*com$")
  ]);
  nomClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  tel: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[234579][0-9]*$'),
  ]);

  siteWeb: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  adresse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  manuel: FormControl = new FormControl('Client');

  constructor(private formService : FormService,private router : Router,  private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();
    this.formService.listDepatemtent().subscribe(res=>{
      this.departements = res as Departement []
    })
  }

  createForm() {
    this.myForm = new FormGroup({
      sujet: this.sujet,
      departement : this.departement ,
      emailClient: this.emailClient,
      nomClient: this.nomClient,
      tel: this.tel,
      description: this.description,
      manuel: this.manuel,
      siteWeb: this.siteWeb,
      adresse: this.adresse
    });
  }

  envoyer() {
    this.formService.addTicket(this.myForm.value).subscribe((res) => {
      Object.keys(this.myForm.controls).forEach((key) => {
        let formC = this.myForm.get(key);
        if (formC) {
          formC.setValue('');
          formC.setErrors(null);
        }
      });
    });
  }



}

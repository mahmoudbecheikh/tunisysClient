import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/models/departement';
import { FormService } from '../services/form.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  departements: Departement[] = [];
  myForm: FormGroup = new FormGroup({});

  attachmentList: any = [];

  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);
  departement: FormControl = new FormControl('', Validators.required);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
  ]);

  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nomClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
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
    Validators.pattern('(www)\\.([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
  ]);

  adresse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);

  manuel: FormControl = new FormControl('client');
  statut: FormControl = new FormControl('en attente');

  formdata = new FormData();

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.createForm();
    this.formService.listDepatemtent().subscribe((res) => {
      this.departements = res as Departement[];
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      sujet: this.sujet,
      departement: this.departement,
      emailClient: this.emailClient,
      nomClient: this.nomClient,
      tel: this.tel,
      description: this.description,
      manuel: this.manuel,
      statut: this.statut,
      siteWeb: this.siteWeb,
      adresse: this.adresse,
    });
  }

  // envoyer() {
  //   this.formService.addTicket(this.myForm.value).subscribe((res) => {
  //     Object.keys(this.myForm.controls).forEach((key) => {
  //       let formC = this.myForm.get(key);
  //       if (formC) {
  //         formC.setValue('');
  //         formC.setErrors(null);
  //       }
  //     });
  //     this.manuel.setValue('client');
  //     this.statut.setValue('en attente');
  //   });
  // }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.formdata.append('files', element);
      this.attachmentList.push(element.name);
    }
  }

  ajouter() {
    this.formService.addTicket(this.myForm.value).subscribe((res) => {
      if (res) {
        this.formdata.append('id', res._id);
        this.formService.uploadFiles(this.formdata).subscribe((res) => {
          console.log(res);
        });
      }
      this.myForm.reset();
      this.attachmentList = [];
    });
  }
}

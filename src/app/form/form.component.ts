import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/models/departement';
import { FormService } from '../services/form.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

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
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nomClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);
  adresse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('[a-zA-ZÀ-ÿ ]*'),
  ]);
  siteWeb: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('(www)\\.([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
  ]);
  telClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[234579][0-9]*$'),
  ]);
  departement: FormControl = new FormControl('', Validators.required);

  formdata = new FormData();

  constructor(
    private formService: FormService,
    private toastr: ToastrService
  ) {}

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
      telClient: this.telClient,
      description: this.description,
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
      this.attachmentList.push(element);
    }
  }

  ajouter() {
    this.formdata.append('sujet', this.sujet.value);
    this.formdata.append('departement', this.departement.value);
    this.formdata.append('emailClient', this.emailClient.value);
    this.formdata.append('nomClient', this.nomClient.value);
    this.formdata.append('telClient', this.telClient.value);
    this.formdata.append('description', this.description.value);
    this.formdata.append('siteWeb', this.siteWeb.value);
    this.formdata.append('adresse', this.adresse.value);
    this.formdata.append('statut', 'en attente');
    this.formdata.append('manuel', 'client');
    for (const file of this.attachmentList) {
      this.formdata.append('files', file);
    }

    this.formService.ajouterTicket(this.formdata).subscribe((res) => {
      if (res) {
        this.toastr.success('', 'Ticket ajouté avec succès!');
      }
    });
    this.myForm.reset();
    this.formdata = new FormData();
    this.attachmentList = [];
  }

  deleteFile(i: any) {
    this.attachmentList.splice(i, 1);
  }
}

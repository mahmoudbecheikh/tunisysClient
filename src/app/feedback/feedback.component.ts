import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService
  ) {}
  note = new FormControl('', Validators.required);
  commentaire = new FormControl('');
  myForm: FormGroup = new FormGroup({});
  valid?: Boolean = true;
  success: Boolean = false;
  token: any;
  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.formService.afficherParJeton(this.token).subscribe((res) => {
      if (res) {
        if (res?.jetonUtilise) this.valid = false;
      } else {
        this.valid = false;
      }
    });

    this.myForm = new FormGroup({
      note: this.note,
      commentaire: this.commentaire,
    });
  }
  envoyer() {
    this.formService
      .envoyerAvis(this.myForm.value, this.token)
      .subscribe((res) => {
        this.success = true;
        this.myForm.reset();
      });
  }
}

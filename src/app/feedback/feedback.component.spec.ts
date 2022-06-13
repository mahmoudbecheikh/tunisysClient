import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormService } from '../services/form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { FeedbackComponent } from './feedback.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, ReactiveFormsModule,RouterTestingModule],
      providers: [FormService, ],

      declarations: [FeedbackComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('jeton utilise', () => {
    const service = fixture.debugElement.injector.get(FormService);
    spyOn(service, 'afficherParJeton').and.returnValue(
      of({ jetonUtilise: true })
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.valid).toBeTruthy();
  });

  it('submitting a form emits a ticket', () => {
    const service = fixture.debugElement.injector.get(FormService);
    const spy = spyOn(service, 'envoyerAvis').and.returnValue(of({note:'3','commentaire':'Lorem ipsum dolor sit amet'}));
    expect(component.myForm.valid).toBeFalsy();
    component.note.setValue('3');
    component.commentaire.setValue('Lorem ipsum dolor sit amet');
   
    expect(component.myForm.valid).toBeTruthy();
    component.envoyer();
    expect(spy).toHaveBeenCalledWith(component.myForm.value,'');
  });
});

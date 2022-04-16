import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path : '' , component : FormComponent
  },
  {
    path : 'avis/:token' , component : FeedbackComponent
  },
  {
    path : "**" , component : ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

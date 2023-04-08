import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLoginComponent } from './components/first-login/first-login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';


const routes: Routes = [
  {
    path: "",
    component: FirstLoginComponent
  },
];

@NgModule({
  declarations: [
    FirstLoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class FirstLoginModule { }

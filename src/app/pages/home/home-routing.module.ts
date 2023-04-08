import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqsComponent } from './components/faqs/faqs.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { PolicyComponent } from './components/policy/policy.component';
import { TermsComponent } from './components/terms/terms.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "landing",
        component: LandingComponent
      },
      {
        path: 'faqs',
        component: FaqsComponent
      },
      {
        path: 'policy',
        component: PolicyComponent
      },
      {
        path: 'terms',
        component: TermsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

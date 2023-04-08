import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { StepsComponent } from './components/steps/steps.component';
import { PlanComponent } from './components/plan/plan.component';
import { ManageComponent } from './components/manage/manage.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { HomeComponent } from './components/home/home.component';
import { TermsComponent } from './components/terms/terms.component';
import { PolicyComponent } from './components/policy/policy.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LandingComponent,
    HeroComponent,
    FeaturesComponent,
    StepsComponent,
    PlanComponent,
    ManageComponent,
    FaqsComponent,
    HomeComponent,
    TermsComponent,
    PolicyComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }

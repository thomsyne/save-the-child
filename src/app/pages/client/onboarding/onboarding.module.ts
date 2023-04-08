import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingContainerComponent } from './components/onboarding-container/onboarding-container.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { UtilityModule } from '@ga/utility';
import { AdminInformationComponent } from './components/admin-information/admin-information.component';
import { BusinessInformationComponent } from './components/business-information/business-information.component';
import { LeasePlanComponent } from './components/lease-plan/lease-plan.component';
import { MobilePlanComponent } from './components/mobile-plan/mobile-plan.component';
import { SubscriptionPlanComponent } from './components/subscription-plan/subscription-plan.component';
import { OutrightPlanComponent } from './components/outright-plan/outright-plan.component';
import { SubscriptionOptionComponent } from './components/subscription-option/subscription-option.component';
import { DynamicFormModule } from '@ga/dynamic-form';
import { TermsOfUseModalComponent } from './components/terms-of-use-modal/terms-of-use-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { FileUploadModule } from '@ga/file-upload';



@NgModule({
  declarations: [
    OnboardingContainerComponent,
    AdminInformationComponent,
    BusinessInformationComponent,
    LeasePlanComponent,
    MobilePlanComponent,
    SubscriptionPlanComponent,
    OutrightPlanComponent,
    SubscriptionOptionComponent,
    TermsOfUseModalComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    UtilityModule,
    DynamicFormModule,
    SharedModule,
    FileUploadModule
  ]
})
export class OnboardingModule { }

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DynamicFormModule } from "@ga/dynamic-form";
import { DynamicTableModule } from "@ga/dynamic-table";
import { FileUploadModule } from "@ga/file-upload";
import { ModalModule } from "@ga/modal";
import { SkeletonModule } from "@ga/skeleton";
import { UtilityModule } from "@ga/utility";
import { EntitiesRoutingModule } from "../entities/entities-routing.module";
import { BanksRoutingModule } from "./banks.routing.module";
import { BankContainerComponent } from "./components/bank-container/bank-container.component";
import { BankListComponent } from "./components/bank-list/bank-list.component";
import { CreateBankComponent } from "./components/create-bank/create-bank.component";

@NgModule({
    declarations: [
      BankContainerComponent,
      BankListComponent,
      CreateBankComponent,
    ],
    imports: [
      CommonModule,
      DynamicTableModule,
      BanksRoutingModule,
      UtilityModule,
      SkeletonModule,
      DynamicFormModule,
      ModalModule,
      FileUploadModule,
    ],
  })
  export class BanksModule {}
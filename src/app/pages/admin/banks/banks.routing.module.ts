import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BankContainerComponent } from "./components/bank-container/bank-container.component";
import { BankListComponent } from "./components/bank-list/bank-list.component";
import { CreateBankComponent } from "./components/create-bank/create-bank.component";

const routes: Routes = [
    {
      path: "",
      component: BankContainerComponent,
      children: [
        {
          path: "",
          component: BankListComponent,
        },
        {
          path: "create",
          component: CreateBankComponent
        },
      ]
    }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
  })
  export class BanksRoutingModule {}
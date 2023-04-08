import { EntityOrderDetailComponent } from './components/entity-order-detail/entity-order-detail.component';
import { EntityOrdersComponent } from './components/entity-orders/entity-orders.component';
import { EntityProfileComponent } from './components/entity-profile/entity-profile.component';
import { CreateEntityComponent } from './components/create-entity/create-entity.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageRoleGuard, SearchAllUserGuard, ViewRoleGuard, ViewRolesGuard, ViewUserGuard } from "@ga/core";
import { EntityContainerComponent } from "./components/entity-container/entity-container.component";
import { EntityListComponent } from "./components/entity-list/entity-list.component";

const routes: Routes = [
  {
    path: "",
    component: EntityContainerComponent,
    children: [
      {
        path: "",
        component: EntityListComponent,
      },
      {
        path: "create",
        component: CreateEntityComponent
      },
      {
        path: ":code/profile",
        component: EntityProfileComponent
      },
      {
        path: ":code/orders",
        component: EntityOrdersComponent
      },
      {
        path: ":id/details",
        component: EntityOrderDetailComponent
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
export class EntitiesRoutingModule {}

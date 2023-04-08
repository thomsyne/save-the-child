import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoggedInGuard } from "@ga/core";
import { LoginComponent } from "./pages/admin/authentication/login/login.component";

const routes: Routes = [
  {
    path: "admin-login",
    component: LoginComponent,
  },
  // {
  //   path: "",
  //   loadChildren: () =>
  //     import("./pages/home/home.module").then((m) => m.HomeModule),
  // },
  {
    path: "",
    loadChildren: () =>
      import("./pages/client/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "payment",
    loadChildren: () => import("./pages/client/first-login/first-login.module").then(
      m => m.FirstLoginModule
    )
  },
  {
    path: "onboarding",
    loadChildren: () =>
      import("./pages/client/onboarding/onboarding.module").then(
        (m) => m.OnboardingModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./pages/shared/layout/layout.module").then((m) => m.LayoutModule),
      canActivate: [LoggedInGuard]
  },
  {
    path: "status",
    loadChildren: () => import("./pages/shared//statuses/status.module").then(
      m => m.StatusModule,
    ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

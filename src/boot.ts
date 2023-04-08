import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment.dev";

if (environment.production) {
  enableProdMode();
  if (window) {
    window.console.log = function () {};
  }
}

const link = document.createElement("link");
link.href = environment.CSS_URL;
link.rel = "stylesheet";
document.head.appendChild(link);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((error) => console.error(error));

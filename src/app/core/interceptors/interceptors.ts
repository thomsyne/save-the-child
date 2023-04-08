import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandlingInterceptorService } from "./error-handling-interceptor.service";
import { InterceptorService } from "./interceptor.service";

export const InterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlingInterceptorService,
    multi: true,
  },
];

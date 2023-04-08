import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from "@ga/utility";
import { AuthService, Config } from "..";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlingInterceptorService implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private config: Config
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        console.log(err);

        let errorMessage = "Error Occured";

        if (typeof err === "string") {
          errorMessage = err;
        } else {
          if (
            err.status === 401 &&
            !req.url.includes(this.config.storeAdminLogin)
          ) {
            this.authService.logout();
          }
          if (err.message !== null || err.message !== undefined) {
            errorMessage = err.message;
          }

          if (err.error instanceof ErrorEvent) {
            errorMessage = "An error occurred, pls try again";
          } else if (err.error instanceof ProgressEvent) {
            errorMessage = "Unable to connect to the service";
          } else if (err.error instanceof ArrayBuffer) {
            errorMessage = "An error occurred, Unable to generate receipt";
          } else {
            errorMessage = err.error.message;
          }
        }
        console.log("errrrrr", errorMessage);

        this.alertService.error(errorMessage, {
          autoClose: true,
          keepOnRouteChange: false,
        });
        return throwError(errorMessage);
      })
    );
  }
}

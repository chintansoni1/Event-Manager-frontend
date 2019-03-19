import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AppService } from "./app.service";

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private appService: AppService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        "x-access-token": this.appService.getToken(),
        Pragma: "no-cache"
      },
      url: this.appService.baseUrl + request.url
    });
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
          }
        },
        error => {
          if (error.status === 401) {
            this.appService.redirectToLogin();
          }
        }
      )
    );
  }
}

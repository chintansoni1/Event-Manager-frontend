import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable, Observer } from "rxjs";
import { AppService } from "../services/app.service";

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private appService: AppService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.appService.getToken()) {
      this.appService.getTokenFromStorage();
      if (!this.appService.getToken()) {
        this.router.navigate(["login"]);
        return false;
      }
      return true;
    }
    return true;
  }
}

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Route
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import { AuthService } from "./auth.service";
import * as fromRoot from "../app.reducer";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Takes 1 value and closes subscription
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
  canLoad(route: Route) {
    // Takes 1 value and closes subscription
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}

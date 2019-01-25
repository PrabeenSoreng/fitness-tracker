import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import * as fromRoot from '../app.reducer';
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private store: Store<fromRoot.State>,
        private router: Router,
        private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}
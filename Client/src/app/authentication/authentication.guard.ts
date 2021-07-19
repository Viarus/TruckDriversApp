import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { User } from "src/app/shared/models/user.model";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { PublicConstants } from "../shared/constants/public.constants";
import { AuthService } from "../shared/services/authentication-service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree {

        let loadedUser: User = this.authService.user;
        if (loadedUser.email == PublicConstants.DEFAULT_INVALID || loadedUser.token == PublicConstants.DEFAULT_INVALID || loadedUser.id == PublicConstants.DEFAULT_INVALID) {
            return this.router.createUrlTree(['/login']);
        }
        else {
            return true;
        }
    }
}
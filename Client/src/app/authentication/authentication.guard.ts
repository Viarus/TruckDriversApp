import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { User } from "Models/user.model";
import { Observable } from "rxjs";
import { take, tap } from "rxjs/operators";
import { PublicConstants } from "../shared/public.constants";
import { AuthService } from "./authentication-service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private publicConstants: PublicConstants) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree {

        let loadedUser: User = this.authService.user;
        if (loadedUser.email == this.publicConstants.defaultInvalid || loadedUser.token == this.publicConstants.defaultInvalid || loadedUser.id == this.publicConstants.defaultInvalid) {
            return this.router.createUrlTree(['/login']);
        }
        else {
            return true;
        }
    }
}
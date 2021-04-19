import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { User } from "src/app/shared/models/user.model";
import { Observable } from "rxjs";
import { PublicConstants } from "../shared/constants/public.constants";
import { AuthService } from "../shared/services/authentication-service";

@Injectable({ providedIn: "root" })
export class UnAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private publicConstants: PublicConstants) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree {

        let loadedUser: User = this.authService.user;
        if (loadedUser.email == this.publicConstants.defaultInvalid || loadedUser.token == this.publicConstants.defaultInvalid || loadedUser.id == this.publicConstants.defaultInvalid) {
            return true
        }
        else {
            return this.router.createUrlTree(['/input']);
        }
    }
}
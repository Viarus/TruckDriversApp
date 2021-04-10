import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { User } from "Models/user.model";
import { Observable } from "rxjs";
import { AuthService } from "./authentication-service";

@Injectable({ providedIn: "root" })
export class UnAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree {

        let loadedUser: User = this.authService.user;
        if (loadedUser.email == "notValid" || loadedUser.token == "notValid" || loadedUser.id == "notValid") {
            return true
        }
        else {
            return this.router.createUrlTree(['/input']);
        }

        // this.authService.userSub.subscribe(user => {
        //     if (user.email == "notValid" || user.token == "notValid" || user.id == "notValid") {
        //         return this.router.createUrlTree(['/login']);
        //     }
        //     else {
        //         return true;
        //     });
        }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user.model";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { PublicConstants } from "../constants/public.constants";
import { SecretConstants } from "../constants/secret.constants";
import { LoginAndSignupBody } from "../models/request/LoginAndSignupBody.model";

//AFTER REFRESH YOU CAN'T ADD DAYS -- FIX -- [send credentials before adding days, if empty check cache]
//TOASTR FOR ADDING DAYS SEEMS TO NOT WORK --FIX--

export interface AuthResponseData {
    kind?: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {

    userSub = new Subject<User>();
    user = new User();
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router, private toastrService: ToastrService) { }

    isUserValid(user: User): boolean {
        if ((user.email == PublicConstants.DEFAULT_INVALID) || (user.id == PublicConstants.DEFAULT_INVALID) || (user.token == PublicConstants.DEFAULT_INVALID)) {
            return false;
        }
        else if (!user.tokenValid) {
            return false;
        }
        else {
            return true;
        }
    }

    autoLogin() {
        if (this.isAutoLoadingLocalStorageEmpty()) return;
        if (this.user.tokenValid) {
            this.userSub.next(this.user);
            const expirationDuration = new Date(this.user.tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    signup(email: string, password: string) {
        let signupRequest = new LoginAndSignupBody(email, password);
        return this.http.post<AuthResponseData>(SecretConstants.FIREBASE_SIGNUP_ENDPOINT + SecretConstants.webApiKey, signupRequest).pipe(tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }


    login(email: string, password: string) {
        let loginRequest = new LoginAndSignupBody(email, password);
        return this.http.post<AuthResponseData>(SecretConstants.FIREBASE_LOGIN_ENDPOINT + SecretConstants.webApiKey, loginRequest).pipe(tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    loginAnonymously() {
        return this.http.post<AuthResponseData>(SecretConstants.FIREBASE_LOGIN_ANONYM_ENDPOINT + SecretConstants.webApiKey,
            {
                returnSecureToken: true
            }).pipe(tap(resData => {
                this.handleAuthentication(PublicConstants.GUEST_ACCOUNT_EMAIL, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    logout() {
        let emptyUser: User = new User();
        this.userSub.next(emptyUser);
        this.router.navigate([PublicConstants.ROUTER_PATH_TO_LOGIN]);
        localStorage.removeItem(PublicConstants.LOCAL_STORAGE_USER_DATA);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        console.log("logged Out");
        //toastr - after you fix relod after logout
        //this.toastrService.success(this.publicConstants.logoutSuccess);
        window.location.reload();
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(resdata => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        var user = new User();
        user.email = email;
        user.id = userId;
        user.token = token;
        user.tokenExpirationDate = expirationDate;
        this.autoLogout(expiresIn * 1000);
        this.userSub.next(user);
        this.user = user;
        localStorage.setItem(PublicConstants.LOCAL_STORAGE_USER_DATA, JSON.stringify(this.user));
    }

    private isAutoLoadingLocalStorageEmpty(): boolean{
        let user: User = JSON.parse(localStorage.getItem(PublicConstants.LOCAL_STORAGE_USER_DATA));
        if (!user) return true;
        else {
            this.user = user;
            return false;
        }
    }
}
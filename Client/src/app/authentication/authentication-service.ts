import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "Models/user.model";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { SecretConstants } from "../shared/secret.constants";

export interface AuthResponseData {
    kind: string;
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

    constructor(private http: HttpClient, private router: Router) { }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            token: string;
            tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        let loadedUser = new User();
        loadedUser.email = userData.email;
        loadedUser.id = userData.id;
        loadedUser.token = userData.token;
        loadedUser.tokenExpirationDate = new Date(userData.token);
        if (loadedUser.tokenValid) {
            this.userSub.next(loadedUser);
            this.user = loadedUser;
            const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
            //something is wrong - need to be fixed
            //this.autoLogout(expirationDuration);
        }
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + SecretConstants.webApiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }


    login(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + SecretConstants.webApiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    logout() {
        var emptyUser: User = new User();
        this.userSub.next(emptyUser);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        window.location.reload();
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(this.logout, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number,) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        var user = new User();
        user.email = email;
        user.id = userId;
        user.token = token;
        user.tokenExpirationDate = expirationDate;
        this.autoLogout(expiresIn * 1000);
        this.userSub.next(user);
        this.user = user;
        localStorage.setItem('userData', JSON.stringify(this.user));
    }
}
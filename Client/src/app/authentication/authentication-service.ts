import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

    constructor(private http: HttpClient) { }

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

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number,) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        var user = new User();
        user.email = email;
        user.id = userId;
        user._token = token;
        user._tokenExpirationDate = expirationDate;
        this.userSub.next(user);
        this.user = user;
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "Models/user.model";
import { Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: "root"})
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) {}
    
    signup(email: string, password:string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9fDU4_cM0QL4e5oS_2qBBDDeglrYIxuA",
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap(resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
    }
    

    login(email: string, password:string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9fDU4_cM0QL4e5oS_2qBBDDeglrYIxuA",
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap(resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number, ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const user = new User(email, userId, token, expirationDate);
            this.user.next(user);
    }
}
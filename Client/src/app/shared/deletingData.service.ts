import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { AuthService } from "../authentication/authentication-service";
import { SecretConstants } from "./secret.constants";

@Injectable({ providedIn: 'root' })
export class DeletingDataService {
    
    constructor(private http: HttpClient, private authService: AuthService, private secretConstants: SecretConstants) { }

    onDelete(docId: string){
        const headerDict = {
            'docId' : docId,
            'token': this.authService.user.token
        }    
        const requestOptions = {
            headers: new HttpHeaders(headerDict),
        };
        this.http.delete(this.secretConstants.pathToDaysApi, requestOptions).pipe(take(1)).subscribe();
    }
}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs/operators";
import { AuthService } from "./authentication-service";
import { PublicConstants } from "../constants/public.constants";
import { SecretConstants } from "../constants/secret.constants";
import { DeleteHeader } from "../models/request/DeleteHeader.model";

@Injectable({ providedIn: 'root' })
export class DeletingDataService {

    constructor(private http: HttpClient, private authService: AuthService, private toastrService: ToastrService, private publicConstants: PublicConstants) { }

    onDelete(docId: string) {

        let deleteHeader: DeleteHeader = new DeleteHeader(docId, this.authService.user.token);

        const requestOptions = {
            headers : deleteHeader.getHeader(deleteHeader),
            responseType :'text' as const
        };

        this.http.delete(SecretConstants.pathToDaysApi, requestOptions).pipe(take(1)).subscribe(resData => {
            this.toastrService.warning(this.publicConstants.deleteSuccess);
        });
    }
}
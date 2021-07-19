import { HttpHeaders } from "@angular/common/http";

export class FetchHeader {

    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    getHeader(fetchHeader: FetchHeader) {
        return new HttpHeaders(JSON.parse(JSON.stringify(this.getMap(fetchHeader))));
    }
    
    private getMap(fetchHeader: FetchHeader) {
        return {
            'token': fetchHeader.token
        }        
    }
}
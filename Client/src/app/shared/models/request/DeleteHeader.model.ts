import { HttpHeaders } from "@angular/common/http";

export class DeleteHeader {

    private docId: string;
    private token: string;

    constructor(docId: string, token: string) {
        this.docId = docId;
        this.token = token;
    }

    getHeader(deleteHeader: DeleteHeader) {
        return new HttpHeaders(JSON.parse(JSON.stringify(this.getMap(deleteHeader))));
    }
    
    private getMap(deleteHeader: DeleteHeader) {
        return {
            'docId': deleteHeader.docId,
            'token': deleteHeader.token
        }        
    }
}
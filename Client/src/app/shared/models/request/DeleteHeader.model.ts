export class DeleteHeader {

    private _docId: string;
    private _token: string;

    constructor(docId: string, token: string) {
        this._docId = docId;
        this._token = token;
    }
}
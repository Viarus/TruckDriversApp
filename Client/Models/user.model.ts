export class User {
    public email: string;
    public id: string;
    public _token: string;
    public _tokenExpirationDate: Date;
    constructor() { 
        this.email = "notValid",
        this.id = "notValid",
        this._token = "notValid",
        this._tokenExpirationDate = new Date();
    }
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        else {
            return this._token;
        }
    }
}


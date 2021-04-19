export class User {
    public email: string;
    public id: string;
    public token: string;
    public tokenExpirationDate: Date;
    constructor() { 
        this.email = "InvalidData",
        this.id = "InvalidData",
        this.token = "InvalidData",
        this.tokenExpirationDate = new Date();
    }
    get tokenValid() {
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return null;
        }
        else {
            return this.token;
        }
    }
}


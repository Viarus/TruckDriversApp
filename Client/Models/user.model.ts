export class User {
    public email: string;
    public id: string;
    public token: string;
    public tokenExpirationDate: Date;
    constructor() { 
        this.email = "notValid",
        this.id = "notValid",
        this.token = "notValid",
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


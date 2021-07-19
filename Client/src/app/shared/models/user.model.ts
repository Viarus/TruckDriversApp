import { PublicConstants } from "../constants/public.constants";

export class User {
    public email: string;
    public id: string;
    public token: string;
    public tokenExpirationDate: Date;

    constructor() { 
        this.email = PublicConstants.DEFAULT_INVALID,
        this.id = PublicConstants.DEFAULT_INVALID,
        this.token = PublicConstants.DEFAULT_INVALID,
        this.tokenExpirationDate = new Date();
    }

    assignValuesToUser(email, id, token, tokenExpirationDate){
        this.email = email;
        this.id = id;
        this.token = token;
        this.tokenExpirationDate = tokenExpirationDate;
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


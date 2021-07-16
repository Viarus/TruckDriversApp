export class LoginAndSignupBody {
    private _email: string;
    private _password: string;
    private _returnSecureToken: boolean;

    constructor(email, password){
        this._email = email;
        this._password = password;
        this._returnSecureToken = true;
    }
}
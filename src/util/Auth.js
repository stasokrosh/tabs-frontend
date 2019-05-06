import jwt_decode from 'jwt-decode'

class UserAuth {
    constructor(token) {
        this._token = token;
    }

    get isAuthorized() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }

    get user() {
        return jwt_decode(this._token);
    }
}

export default UserAuth;
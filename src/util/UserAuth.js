import { signUpRequest, signInRequest, getAuthInfoRequest } from '../api/auth-api';
import { updateUserRequest } from '../api/user-api';

class UserAuth {
    get isAuthorised() {
        return this._token;
    }

    get user() {
        return this._user;
    }

    get token() {
        return this._token;
    }

    async update() {
        if (this._token) {
            let res = await getAuthInfoRequest(this._token)
            this._user = res.body;
        }
    }

    async addFavourite(id) {
        if (this._token) {
            let user = { favouriteTabs: this._user.favouriteTabs };
            user.favouriteTabs.push(id);
            let res = await updateUserRequest(this._user.name, this._token, user);
            this._user = res.body;
        }
    }

    async removeFavourite(id) {
        if (this._token) {
            let user = { favouriteTabs: this._user.favouriteTabs };
            let index = user.favouriteTabs.indexOf(id);
            if (index !== -1) {
                user.favouriteTabs.splice(index, 1);
                let res = await updateUserRequest(this._user.name, this._token, user)
                this._user = res.body;
            }
        }
    }

    async addGroup(name) {
        if (this._token) {
            let user = { groups: this._user.groups };
            user.groups.push(name);
            let res = await updateUserRequest(this._user.name, this._token, user)
            this._user = res.body;
        }
    }

    async removeGroup(name) {
        if (this._token) {
            let user = { groups: this._user.groups };
            let index = user.groups.indexOf(name);
            if (index !== -1) {
                user.groups.splice(index, 1);
                let res = await updateUserRequest(this._user.name, this._token, user)
                this._user = res.body;
            }
        }
    }

    async register(name, password) {
        let res = await signUpRequest(name, password);
        if (res.success) {
            this._token = res.body.token;
            await this.update();
        }
        return res;
    }

    async authorise(name, password) {
        let res = await signInRequest(name, password);
        if (res.success) {
            this._token = res.body.token;
            await this.update();
        }
        return res;
    }

    logout() {
        this._token = null;
        this._user = null;
    }
}

export default UserAuth;
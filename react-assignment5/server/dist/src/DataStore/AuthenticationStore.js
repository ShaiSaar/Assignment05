"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationStore {
    constructor() {
        this.state = {
            shai: "123",
            ariel: "123",
            ohad: "123"
        };
    }
    get(key) {
        if (!this.state[key]) {
            return null;
        }
        return this.state[key];
    }
    set(key, value) {
        this.state[key] = value;
        return true;
    }
    static getInstance() {
        if (!AuthenticationStore.instance) {
            AuthenticationStore.instance = new AuthenticationStore();
        }
        return AuthenticationStore.instance;
    }
}
exports.default = AuthenticationStore;
//# sourceMappingURL=AuthenticationStore.js.map
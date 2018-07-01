"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const fs = require('fs');
const readFileSync = util.promisify(fs.readFile);
const watchFileSync = util.promisify(fs.watchFile);
class DBusers {
    constructor() {
        this.data = this.readFromJson();
    }
    readFromJson() {
        const data = fs.readFileSync(__dirname + '/data.json');
        return JSON.parse(data);
    }
    writeToJson() {
        fs.writeFileSync(__dirname + '/data.json', JSON.stringify(this.data));
    }
    getUsers() {
        return new Promise((resolve) => {
            resolve(this.data.users);
        });
    }
    createUser(user) {
        return new Promise((resolve) => {
            setTimeout(() => {
                user.id = this.data.users[this.data.users.length - 1].id + 1;
                this.data.users.push(user);
                this.writeToJson();
                resolve(user);
            }, 500);
        });
    }
}
module.exports = DBusers;
//# sourceMappingURL=DBusers.js.map
"use strict";
/*
id++
type- "user"
Age- number
name- string
password- hash
parent- [number]

 */
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, password, age) {
        this.getId = () => {
            return this.id;
        };
        this.getType = () => {
            return this.type;
        };
        this.getName = () => {
            return this.name;
        };
        this.setName = (name) => {
            this.name = name;
        };
        this.getAge = () => {
            return this.age;
        };
        this.setAge = (age) => {
            this.age = age;
        };
        this.getPassword = () => {
            return this.age;
        };
        this.setPassword = (Password) => {
            this.password = Password;
        };
        this.addToParent = (id) => {
            this.parent.push(id);
        };
        this.removeFromParent = (id) => {
            let index = this.parent.findIndex(i => i === id);
            if (index === -1) {
                return false;
            }
            else {
                this.parent.splice(index, 1);
                return true;
            }
        };
        let today = new Date();
        this.id = Math.abs(today.getTime());
        this.type = 'user';
        this.name = name;
        this.age = age;
        this.password = password + "";
        this.parent = [];
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map
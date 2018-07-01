"use strict";
/*
id++
type- "group"
name- string
parent - number
Users - [User]
Groups - [Group]

 */
Object.defineProperty(exports, "__esModule", { value: true });
class Group {
    constructor(name, parent) {
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
        this.addToItems = (obj) => {
            this.items.push(obj);
        };
        this.removeFromItems = (objId) => {
            let index = this.items.findIndex(entry => entry["id"] === objId);
            if (index === -1) {
                return false;
            }
            else {
                this.items.splice(index, 1);
                return true;
            }
        };
        let today = new Date();
        this.id = Math.abs(today.getTime());
        this.parent = parent || null;
        this.type = 'group';
        this.name = name;
        this.items = [];
    }
}
exports.default = Group;
//# sourceMappingURL=Group.js.map
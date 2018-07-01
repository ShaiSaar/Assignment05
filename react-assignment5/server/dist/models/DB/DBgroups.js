"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const fs = require('fs');
const readFileSync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);
class DBgroups {
    constructor() {
        //
        this.path = `${__dirname}\\..\\..\\../models/DB/Json/Groups.json`;
        this.readFromJson()
            .then((data) => {
            //console.log(`finished constructor:`,data)
            this.data = data;
        })
            .catch((err) => console.log(err));
    }
    static getInstance() {
        if (!DBgroups.instance) {
            DBgroups.instance = new DBgroups();
        }
        return DBgroups.instance;
    }
    async readFromJson() {
        let data = await readFileSync(this.path);
        // if (data.length===0){
        //    return this.data = []
        // }
        return JSON.parse(data);
    }
    writeToJson() {
        writeFileSync(this.path, JSON.stringify(this.data));
    }
    getGroups() {
        return new Promise((resolve) => {
            resolve(this.data);
        });
    }
    createGroup(group) {
        return new Promise((resolve) => {
            console.log("this.data=======>", this.data);
            this.data.push(group);
            this.writeToJson();
            resolve(group);
        });
    }
    getGroup(id) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.id == id);
            if (index === -1) {
                resolve("No Group found");
                return;
            }
            resolve(this.data[index]);
        });
    }
    updateGroup(id, groupBody) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.id == id);
            console.log("groupBody", groupBody);
            if (index === -1) {
                resolve("No Group found");
                return;
            }
            let updatedGroup = Object.assign({}, this.data[index], groupBody);
            this.data[index] = updatedGroup;
            console.log(">>>>>>>>>>>>>>>>data", this.data[index]);
            console.log(">>>>>>>>>>>>>>>>>>>groupbody", groupBody);
            this.writeToJson();
            resolve(this.data[index]);
        });
    }
    deleteGroup(id) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.id == id);
            if (index === -1) {
                resolve("No Group found");
                return;
            }
            this.data.splice(index, 1);
            this.writeToJson();
            resolve("Group has been deleted");
        });
    }
}
exports.default = DBgroups;
//# sourceMappingURL=DBgroups.js.map
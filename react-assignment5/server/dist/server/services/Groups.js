"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as Model from '../models'
const DBgroups_1 = require("../models/DB/DBgroups");
const Group_1 = require("../models/Moduls/Group");
// import Group from '../models/Moduls/Group'
async function addGroup(name, parent) {
    let checkIfGroupExist = await DBgroups_1.default.getInstance().checkIfGroupExist(name);
    console.log("checkIfUserExist", checkIfGroupExist);
    if (!!checkIfGroupExist) {
        return "group exist";
    }
    //const newGroup = new Group(name,parent)
    const newGroup = new Group_1.default(name, null);
    return await DBgroups_1.default.getInstance().createGroup(newGroup);
}
exports.addGroup = addGroup;
async function getGroups() {
    return await DBgroups_1.default.getInstance().getGroups();
}
exports.getGroups = getGroups;
async function GetGroup(id) {
    return await DBgroups_1.default.getInstance().getGroup(id);
}
exports.GetGroup = GetGroup;
async function UpdateGroup(id, bodyObj) {
    return await DBgroups_1.default.getInstance().updateGroup(id, bodyObj);
}
exports.UpdateGroup = UpdateGroup;
async function DeleteGroup(id) {
    return await DBgroups_1.default.getInstance().deleteGroup(id);
}
exports.DeleteGroup = DeleteGroup;
//# sourceMappingURL=Groups.js.map
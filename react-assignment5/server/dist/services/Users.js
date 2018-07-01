"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as Model from '../models'
const DBusers_1 = require("../models/DB/DBusers");
const User_1 = require("../models/Moduls/User");
// import Group from '../models/Moduls/Group'
async function addUser(name, password, age) {
    let checkIfUserExist = await DBusers_1.default.getInstance().checkIfUserExist(name);
    console.log("checkIfUserExist", checkIfUserExist);
    if (!!checkIfUserExist) {
        return "user exist";
    }
    const newUser = new User_1.default(name, password, age);
    return await DBusers_1.default.getInstance().createUser(newUser);
}
exports.addUser = addUser;
async function getUsers() {
    return await DBusers_1.default.getInstance().getUsers();
}
exports.getUsers = getUsers;
async function GetUser(id) {
    return await DBusers_1.default.getInstance().getUser(id);
}
exports.GetUser = GetUser;
async function GetUserByName(name, password) {
    return await DBusers_1.default.getInstance().getUserByName(name, password);
}
exports.GetUserByName = GetUserByName;
async function UpdateUser(id, bodyObj) {
    return await DBusers_1.default.getInstance().updateUser(id, bodyObj);
}
exports.UpdateUser = UpdateUser;
async function DeleteUser(id) {
    return await DBusers_1.default.getInstance().deleteUser(id);
}
exports.DeleteUser = DeleteUser;
//# sourceMappingURL=Users.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services = require("../services");
async function GetUserByIdController(req, res) {
    const user = await services.GetUser(req.params.id);
    res.json({ answer: user });
}
exports.GetUserByIdController = GetUserByIdController;
;
async function GetUserByNameController(req, res) {
    const user = await services.GetUserByName(req.params.name, req.params.password);
    res.json({ answer: user });
}
exports.GetUserByNameController = GetUserByNameController;
;
async function GetUsersController(req, res) {
    const allUsers = await services.getUsers();
    res.json({ answer: allUsers });
}
exports.GetUsersController = GetUsersController;
;
async function AddUserController(req, res) {
    const newUser = await services.addUser(req.body.username, req.body.password, req.body.age);
    res.json({ answer: newUser });
}
exports.AddUserController = AddUserController;
;
async function UpdateUserController(req, res) {
    const tree = await services.UpdateUser(req.params.id, req.body);
    res.json({ answer: tree });
}
exports.UpdateUserController = UpdateUserController;
;
async function DeleteUserController(req, res) {
    const tree = await services.DeleteUser(req.params.id);
    res.json({ answer: tree });
}
exports.DeleteUserController = DeleteUserController;
;
//# sourceMappingURL=Users.js.map
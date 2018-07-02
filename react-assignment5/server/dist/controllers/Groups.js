"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services = require("../services");
async function GetGroupByIdController(req, res) {
    const user = await services.GetGroup(req.params.id);
    res.json({ answer: user });
}
exports.GetGroupByIdController = GetGroupByIdController;
;
async function GetGroupsController(req, res) {
    const allGroups = await services.getGroups();
    res.json({ answer: allGroups });
}
exports.GetGroupsController = GetGroupsController;
;
async function AddGroupController(req, res) {
    const newUser = await services.addGroup(req.body.name, req.body.parent);
    res.json({ answer: newUser });
}
exports.AddGroupController = AddGroupController;
;
async function UpdateGroupController(req, res) {
    const tree = await services.UpdateGroup(req.params.id, req.body);
    res.json({ answer: tree });
}
exports.UpdateGroupController = UpdateGroupController;
;
async function DeleteGroupController(req, res) {
    const tree = await services.DeleteGroup(req.params.id);
    res.json({ answer: tree });
}
exports.DeleteGroupController = DeleteGroupController;
;
//# sourceMappingURL=Groups.js.map
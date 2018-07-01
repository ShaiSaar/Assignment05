"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Controller = require("../controllers");
//USERS
const router = express.Router();
router.get('/getUser/:id', Controller.GetUserByIdController);
router.get('/getUserByName/:name/:password', Controller.GetUserByNameController);
router.get('/getUsers', Controller.GetUsersController);
router.post('/addUser', express.json(), Controller.AddUserController);
router.put('/updateUser/:id', express.json(), Controller.UpdateUserController);
router.delete('/deleteUser/:id', Controller.DeleteUserController);
exports.default = router;
//# sourceMappingURL=users.js.map
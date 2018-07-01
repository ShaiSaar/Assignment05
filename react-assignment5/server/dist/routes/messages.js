"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Controller = require("../controllers");
const router = express.Router();
//GROUPS
router.get('/getMessages', Controller.GetMessagesController);
router.post('/addMessage/:groupId', express.json(), Controller.AddMessageController);
router.get('/getMessagesById/:id', Controller.GetMessagesByIdController);
//router.put('/updateMessage/:id', express.json(),Controller.UpdateMessageController)
//router.delete('/deleteMessage/:id', Controller.DeleteMessageController)
exports.default = router;
//# sourceMappingURL=messages.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services = require("../services");
async function GetMessagesByIdController(req, res) {
    const messagesById = await services.getMessagesById(req.params.id);
    res.json({ answer: messagesById });
}
exports.GetMessagesByIdController = GetMessagesByIdController;
;
async function GetMessagesController(req, res) {
    const allMessages = await services.getMessages();
    res.json({ answer: allMessages });
}
exports.GetMessagesController = GetMessagesController;
;
async function AddMessageController(req, res) {
    const newMessage = await services.addMessage(req.body.senderID, req.body.senderName, req.body.content, req.params.groupId);
    res.json({ answer: newMessage });
}
exports.AddMessageController = AddMessageController;
;
/*
export async function UpdateMessageController(req:Request, res:Response) {
    const message = await services.updateMessage(req.params.id , req.body)
    res.json({ answer: message })
};

export async function DeleteMessageController(req:Request, res:Response) {
    const message = await services.deleteMessage(req.params.id)
    res.json({ answer: message })
};

*/ 
//# sourceMappingURL=Messages.js.map
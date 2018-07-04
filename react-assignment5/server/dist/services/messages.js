"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as Model from '../models'
const DBmessages_1 = require("../models/DB/DBmessages");
const Message_1 = require("../models/Moduls/Message");
// import Group from '../models/Moduls/Group'
async function addMessage(senderID, senderName, content, groupId) {
    //convObj: object, userObj:object, value:string
    const newMessage = new Message_1.default(senderID, senderName, content);
    return await DBmessages_1.default.getInstance().createMessage(newMessage, groupId);
}
exports.addMessage = addMessage;
async function getMessages() {
    return await DBmessages_1.default.getInstance().getMessages();
}
exports.getMessages = getMessages;
async function getMessagesById(id) {
    return await DBmessages_1.default.getInstance().getMessagesById(id);
}
exports.getMessagesById = getMessagesById;
/*
export async function UpdateMessage(id, bodyObj) {
    return await DBmessages.getInstance().updateMessage(id, bodyObj);
}

export async function DeleteMessage(id) {
    return await DBmessages.getInstance().deleteMessage(id);
}

*/ 
//# sourceMappingURL=messages.js.map
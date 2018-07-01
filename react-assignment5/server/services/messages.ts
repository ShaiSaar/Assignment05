// import * as Model from '../models'
import DBmessages from '../models/DB/DBmessages'
import Message from '../models/Moduls/Message'
// import Group from '../models/Moduls/Group'

export async function addMessage(senderID, senderName, content, groupId) {
    const newMessage = new Message(senderID, senderName, content)
    return await DBmessages.getInstance().createMessage(newMessage, groupId)

}

export async function getMessages() {
    return await DBmessages.getInstance().getMessages();
}


export async function getMessagesById(id) {
    return await DBmessages.getInstance().getMessagesById(id);
}
/*
export async function UpdateMessage(id, bodyObj) {
    return await DBmessages.getInstance().updateMessage(id, bodyObj);
}

export async function DeleteMessage(id) {
    return await DBmessages.getInstance().deleteMessage(id);
}

*/
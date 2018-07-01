import {Request, Response} from 'express'
import * as services from '../services';

export async function GetMessagesByIdController(req:Request, res:Response) {
    const messagesById = await services.getMessagesById(req.params.id)
    res.json({ answer: messagesById })
};

export async function GetMessagesController(req:Request, res:Response) {
    const allMessages = await services.getMessages()
    res.json({ answer: allMessages })
};


export async function AddMessageController(req:Request, res:Response) {
    const newMessage = await services.addMessage(req.body.senderID, req.body.senderName, req.body.content, req.params.groupId)
    res.json({ answer: newMessage })
};
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
import {Request, Response} from 'express'
import * as services from '../services';

export async function GetGroupByIdController(req:Request, res:Response) {
    const user = await services.GetGroup(req.params.id)
    res.json({ answer: user })
};

export async function GetGroupsController(req:Request, res:Response) {
    const allGroups = await services.getGroups()
    res.json({ answer: allGroups })
};

export async function AddGroupController(req:Request, res:Response) {
    const newUser = await services.addGroup(req.body.name, req.body.parent)
    res.json({ answer: newUser })
};

export async function UpdateGroupController(req:Request, res:Response) {
    const tree = await services.UpdateGroup(req.params.id , req.body)
    res.json({ answer: tree })
};

export async function DeleteGroupController(req:Request, res:Response) {
    const tree = await services.DeleteGroup(req.params.id)
    res.json({ answer: tree })
};


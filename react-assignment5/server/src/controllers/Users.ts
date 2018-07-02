import {Request, Response} from 'express'
import * as services from '../services';

export async function GetUserByIdController(req:Request, res:Response) {
    const user = await services.GetUser(req.params.id)
    res.json({ answer: user })
};

export async function GetUserByNameController(req:Request, res:Response) {
    const user = await services.GetUserByName(req.params.name, req.params.password)
    res.json({ answer: user })
};

export async function GetUsersController(req:Request, res:Response) {
    const allUsers = await services.getUsers()
    res.json({ answer: allUsers })
};

export async function AddUserController(req:Request, res:Response) {
    const newUser = await services.addUser(req.body.username, req.body.password,req.body.age)
    res.json({ answer: newUser })
};

export async function UpdateUserController(req:Request, res:Response) {
    const tree = await services.UpdateUser(req.params.id , req.body)
    res.json({ answer: tree })
};

export async function DeleteUserController(req:Request, res:Response) {
    const tree = await services.DeleteUser(req.params.id)
    res.json({ answer: tree })
};


import {Request, Response} from 'express'
import * as services from '../services';

export default async function getTreeController(req:Request, res:Response) {
    const tree = await services.GetTree()
    res.json({ answer: tree })
};
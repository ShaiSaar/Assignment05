import * as Model from '../models/index'

export default async function fetchTree() {

    //const tree = await Model.getTree()
    return await Model.GetTree()
    // return new Promise((resolve, reject)=>{
    //
    //     resolve("this is the tree")
    // })
}
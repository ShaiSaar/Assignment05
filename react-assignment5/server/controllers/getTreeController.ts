import {Request, Response} from 'express'
import * as services from '../services';

export async function GetTreeController(req:Request, res:Response) {
    const tree = await services.GetTree()
    //res.json({ answer: tree })
    //let parse = JSON.parse(tree)
    //console.log(tree)
    //res.json(tree)
    res.send(tree)
};

export async function GetFullTreeController(req:Request, res:Response) {

    let groups = await services.getGroups() //arr groups
    let users = await services.getUsers() // arr users
    debugger
    console.log("groups 11111",groups)
    let userOBJ = arrayToObject(users) // turn to obj
    let groupOBJ = arrayToObject(groups) // turn to obj
    debugger
    console.log("groups 2222",groups)
    //groups = assignObjectsToGroup(groups,userOBJ)
    //groups = assignObjectsToGroup(groups,groupOBJ)
    debugger
    console.log("groups 3333",groups)
    let finalTree = createFinalTree(groups)

    //res.send({groups,users})
    res.send(finalTree)
};

const getNewGroupsFromState = (arr)=>{
    let newArr = []
    for(let entry of arr){
        //let obj = Object.assign({},entry)
        let obj = {...entry}
        newArr.push(obj)
    }
    return newArr
}

const arrayToObject = (arr:any[]) => {
    let newObj ={}
    for (let entry of arr){
        newObj[`${entry.id}`]={...entry}
    }
    return newObj
}

const assignObjectsToGroup = (groupsArr:any[], usersObj :object) => {
    let groupsWithUsers = groupsArr

    for (let entry of groupsWithUsers){
        if(entry['items'].length>0){
            let arrOfUsers=[]
            for (let user of entry['items']){
                if(!!usersObj[user]){
                    arrOfUsers.push(usersObj[user])
                }
            }
            //assign the new array of users obj
            if(arrOfUsers.length>0){
                entry['items']=arrOfUsers
            }

        }
    }
    return groupsWithUsers
}

const createFinalTree = (groupsArr:any[]) => {
    let arr = []
    for(let entry of groupsArr){
        if(!entry[`parent`]){
            arr.push(entry)
        }
    }
    return arr
}
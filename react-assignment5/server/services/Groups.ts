// import * as Model from '../models'
import DBgroups from '../models/DB/DBgroups'
import Group from '../models/Moduls/Group'
import DBusers from "../models/DB/DBusers";
// import Group from '../models/Moduls/Group'

export async function addGroup(name,parent) {
    let checkIfGroupExist = await DBgroups.getInstance().checkIfGroupExist(name)
    console.log("checkIfUserExist", checkIfGroupExist)
    if (!!checkIfGroupExist){
        return "group exist"
    }
    //const newGroup = new Group(name,parent)
    const newGroup = new Group(name, null)
    return await DBgroups.getInstance().createGroup(newGroup)

}

export async function getGroups() {
    return await DBgroups.getInstance().getGroups();
}


export async function GetGroup(id) {
    return await DBgroups.getInstance().getGroup(id);
}

export async function UpdateGroup(id, bodyObj) {
    return await DBgroups.getInstance().updateGroup(id, bodyObj);
}

export async function DeleteGroup(id) {
    return await DBgroups.getInstance().deleteGroup(id);
}
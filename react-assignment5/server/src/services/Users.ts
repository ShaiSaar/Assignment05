// import * as Model from '../models'
import DBusers from '../models/DB/DBusers'
import User from '../models/Moduls/User'
// import Group from '../models/Moduls/Group'

export async function addUser(name,password,age) {
    let checkIfUserExist = await DBusers.getInstance().checkIfUserExist(name)
    console.log("checkIfUserExist", checkIfUserExist)
    if (!!checkIfUserExist){
        return "user exist"
    }
    const newUser = new User(name,password,age)
    return await DBusers.getInstance().createUser(newUser)

}

export async function getUsers() {
    return await DBusers.getInstance().getUsers();
}


export async function GetUser(id) {
    return await DBusers.getInstance().getUser(id);
}
export async function GetUserByName(name, password) {
    return await DBusers.getInstance().getUserByName(name, password);
}

export async function UpdateUser(id, bodyObj) {
    return await DBusers.getInstance().updateUser(id, bodyObj);
}

export async function DeleteUser(id) {
    return await DBusers.getInstance().deleteUser(id);
}
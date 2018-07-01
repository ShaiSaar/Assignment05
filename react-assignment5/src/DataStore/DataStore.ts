
interface IDataStore {
    state: {}

}

//import {Request, Response} from "express";
//import * as services from "../../server/services";

class DataStore {

    state :any;
    constructor(){
        this.state = {
            users: [],
            groups: [],
            messages: {}
        }

        fetch('http://localhost:4000/users/getUsers')
            .then((result) => result.json()).then(
            (result) => {
                this.state.users = result.answer
                console.log("DataStore - users", this.state.users)
            }
        )

        fetch('http://localhost:4000/groups/getGroups')
            .then((result) => result.json()).then(
            (result) => {
                this.state.groups = result.answer
                console.log("DataStore - groups", this.state.groups)
            }
        )
    }


    static instance;

    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }

        return DataStore.instance;
    }

    // getUsersFromServer=()=>{
    //     return fetch('http://localhost:4000/users/getUsers')
    //         .then((result) => result.json()).then(
    //         (result) => {
    //             this.state.users = result.answer
    //             //console.log("DataStore - users", this.state.users)
    //         }
    //     )
    //     };

    // getGroupsFromServer=()=>{
    //     return fetch('http://localhost:4000/groups/getGroups')
    //         .then((result) => result.json()).then(
    //             (result) => {
    //                 this.state.groups = result.answer
    //                 //console.log("DataStore - users", this.state.users)
    //             }
    //         )
    // };


    DBaddUser=(user)=>{
        //copy the user to a new object and the changes
        let newUser = {...user}
        console.log("newUser",newUser)
        // update the data with the new user
        this.state.users.push(newUser)
        return true
    }

    DBaddGroup=(group)=>{
        //copy the user to a new object and the changes
        let newGroup = {...group}
        console.log("newUser",newGroup)
        // update the data with the new user
        this.state.groups.push(newGroup)
        return true
    }

    DBupdateUser=(id,obj)=>{
        let index = this.state.users.findIndex(indx => indx.id == id )
        if(index==-1){
            return false
        }
        //copy the user to a new object and the changes
        let newUser = {...this.state.users[index],...obj}
        console.log("newUser",newUser)
        // update the data with the new user
        this.state.users[index]=newUser
        console.log("this.state.users[index]",this.state.users[index])
        return true
    }
    DBgetUser=(id)=>{
        let index = this.state.users.findIndex(indx => indx.id == id )
        if(index==-1){
            return false
        }
        //copy the user to a new object and the changes
        let newUser = {...this.state.users[index]}
        // update the data with the new user
        return newUser
    }
    DBdeleteUser=(id)=>{
        let index = this.state.users.findIndex(indx => indx.id == id )
        if(index==-1){
            return false
        }
        this.state.users.splice(index,1)
        return true
    }
    DBupdateGroup=(id,obj)=>{
        let index = this.state.groups.findIndex(indx => indx.id == id )
        if(index==-1){
            return false
        }
        //copy the group to a new object and the changes
        let newGroup = {...this.state.groups[index],...obj}
        console.log("newGroup",newGroup)
        // update the data with the new group
        this.state.groups[index]=newGroup
        return true
    }
    DBgetGroup=(id)=>{
        let index = this.state.groups.findIndex(indx => indx.id == id )
        if(index==-1){
            return false
        }
        //copy the group to a new object and the changes
        let newGroup = {...this.state.groups[index]}
        // update the data with the new group
        return newGroup
    }
    DBdeleteGroup=(id)=>{
        let index = this.state.groups.findIndex(indx => indx.id == id )
        if(index==-1){
            return false
        }
        this.state.groups.splice(index,1)
        return true
    }

     DBGetFullTree=(type)=>{
        if(type=="users"){
            let users = this.getNewGroupsFromState(this.state.users)
            console.log("DATA STORE this.state.users BEFORE",this.state.users)
            return users
        }else {
            let groups = this.getNewGroupsFromState(this.state.groups)
            console.log("DATA STORE this.state.groups BEFORE",this.state.groups)
            return groups
        }
        //  let users = this.getNewGroupsFromState(this.state.users)
        //  let groups = this.getNewGroupsFromState(this.state.groups)
        //  let usersOBJ = this.arrayToObject(users)
        //  let groupsOBJ = this.arrayToObject(groups)
        //  // groups = this.assignObjectsToGroup(groups,usersOBJ)
        //  // groups = this.assignObjectsToGroup(groups,groupsOBJ)
        //  console.log("DATA STORE this.state.groups BEFORE",this.state.groups)
        //  let tree = this.createFinalTree(groups)
        //  return tree

    };

    DBMainTree=()=>{

        console.log("DATA STORE this.state.groups BEFORE",this.state.groups)
         let users = this.getNewGroupsFromState(this.state.users)
         let groups = this.getNewGroupsFromState(this.state.groups)
         let usersOBJ = this.arrayToObject(users)
         let groupsOBJ = this.arrayToObject(groups)
         groups = this.assignObjectsToGroup(groups,usersOBJ)
         groups = this.assignObjectsToGroup(groups,groupsOBJ)
         console.log("DATA STORE this.state.groups AFTER",this.state.groups)
         let tree = this.createFinalTree(groups)
         return tree

    };

    getNewGroupsFromState(arr){
        let newArr = []
        for(let entry of arr){
            //let obj = Object.assign({},entry)
            let obj = {...entry}
            newArr.push(obj)
        }
        return newArr
    }
    arrayToObject = (arr:any[]) => {
        let newArr = this.getNewGroupsFromState(arr)
        let newObj ={}
        for (let entry of newArr){
            newObj[`${entry.id}`]={...entry}
        }
        return newObj
    }

    assignObjectsToGroup = (groupsArr:any[], usersObj :object) => {
        let groupsWithUsers = this.getNewGroupsFromState(groupsArr)

        for (let entry of groupsWithUsers){
            if(entry['items'].length>0){
                let arrOfUsers=[]
                for (let user of entry['items']){
                    if(!!usersObj[user]){
                        if(user ==1529873051608){console.log("1529873051608",usersObj[user])}
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

    createFinalTree = (groupsArr:any[]) => {
        let arr = []
        for(let entry of groupsArr){
            if(!entry[`parent`]){
                arr.push(entry)
            }
        }
        return arr
    }

}

export default DataStore
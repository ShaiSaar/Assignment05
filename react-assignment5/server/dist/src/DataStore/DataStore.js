"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {Request, Response} from "express";
//import * as services from "../../server/services";
class DataStore {
    constructor() {
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
        this.DBaddUser = (user) => {
            //copy the user to a new object and the changes
            let newUser = Object.assign({}, user);
            console.log("newUser", newUser);
            // update the data with the new user
            this.state.users.push(newUser);
            return true;
        };
        this.DBaddGroup = (group) => {
            //copy the user to a new object and the changes
            let newGroup = Object.assign({}, group);
            console.log("newUser", newGroup);
            // update the data with the new user
            this.state.groups.push(newGroup);
            return true;
        };
        this.DBupdateUser = (id, obj) => {
            let index = this.state.users.findIndex(indx => indx.id == id);
            if (index == -1) {
                return false;
            }
            //copy the user to a new object and the changes
            let newUser = Object.assign({}, this.state.users[index], obj);
            console.log("newUser", newUser);
            // update the data with the new user
            this.state.users[index] = newUser;
            console.log("this.state.users[index]", this.state.users[index]);
            return true;
        };
        this.DBgetUser = (id) => {
            let index = this.state.users.findIndex(indx => indx.id == id);
            if (index == -1) {
                return false;
            }
            //copy the user to a new object and the changes
            let newUser = Object.assign({}, this.state.users[index]);
            // update the data with the new user
            return newUser;
        };
        this.DBdeleteUser = (id) => {
            let index = this.state.users.findIndex(indx => indx.id == id);
            if (index == -1) {
                return false;
            }
            this.state.users.splice(index, 1);
            return true;
        };
        this.DBupdateGroup = (id, obj) => {
            let index = this.state.groups.findIndex(indx => indx.id == id);
            if (index == -1) {
                return false;
            }
            //copy the group to a new object and the changes
            let newGroup = Object.assign({}, this.state.groups[index], obj);
            console.log("newGroup", newGroup);
            // update the data with the new group
            this.state.groups[index] = newGroup;
            return true;
        };
        this.DBgetGroup = (id) => {
            let index = this.state.groups.findIndex(indx => indx.id == id);
            if (index == -1) {
                return false;
            }
            //copy the group to a new object and the changes
            let newGroup = Object.assign({}, this.state.groups[index]);
            // update the data with the new group
            return newGroup;
        };
        this.DBdeleteGroup = (id) => {
            let index = this.state.groups.findIndex(indx => indx.id == id);
            if (index == -1) {
                return false;
            }
            this.state.groups.splice(index, 1);
            return true;
        };
        this.DBGetFullTree = (type) => {
            if (type == "users") {
                let users = this.getNewGroupsFromState(this.state.users);
                console.log("DATA STORE this.state.users BEFORE", this.state.users);
                return users;
            }
            else {
                let groups = this.getNewGroupsFromState(this.state.groups);
                console.log("DATA STORE this.state.groups BEFORE", this.state.groups);
                return groups;
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
        this.DBMainTree = () => {
            console.log("DATA STORE this.state.groups BEFORE", this.state.groups);
            let users = this.getNewGroupsFromState(this.state.users);
            let groups = this.getNewGroupsFromState(this.state.groups);
            let usersOBJ = this.arrayToObject(users);
            let groupsOBJ = this.arrayToObject(groups);
            groups = this.assignObjectsToGroup(groups, usersOBJ);
            groups = this.assignObjectsToGroup(groups, groupsOBJ);
            console.log("DATA STORE this.state.groups AFTER", this.state.groups);
            let tree = this.createFinalTree(groups);
            return tree;
        };
        this.arrayToObject = (arr) => {
            let newArr = this.getNewGroupsFromState(arr);
            let newObj = {};
            for (let entry of newArr) {
                newObj[`${entry.id}`] = Object.assign({}, entry);
            }
            return newObj;
        };
        this.assignObjectsToGroup = (groupsArr, usersObj) => {
            let groupsWithUsers = this.getNewGroupsFromState(groupsArr);
            for (let entry of groupsWithUsers) {
                if (entry['items'].length > 0) {
                    let arrOfUsers = [];
                    for (let user of entry['items']) {
                        if (!!usersObj[user]) {
                            if (user == 1529873051608) {
                                console.log("1529873051608", usersObj[user]);
                            }
                            arrOfUsers.push(usersObj[user]);
                        }
                    }
                    //assign the new array of users obj
                    if (arrOfUsers.length > 0) {
                        entry['items'] = arrOfUsers;
                    }
                }
            }
            return groupsWithUsers;
        };
        this.createFinalTree = (groupsArr) => {
            let arr = [];
            for (let entry of groupsArr) {
                if (!entry[`parent`]) {
                    arr.push(entry);
                }
            }
            return arr;
        };
        this.state = {
            users: [],
            groups: [],
            messages: {}
        };
        fetch('http://localhost:4000/users/getUsers')
            .then((result) => result.json()).then((result) => {
            this.state.users = result.answer;
            console.log("DataStore - users", this.state.users);
        });
        fetch('http://localhost:4000/groups/getGroups')
            .then((result) => result.json()).then((result) => {
            this.state.groups = result.answer;
            console.log("DataStore - groups", this.state.groups);
        });
    }
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    getNewGroupsFromState(arr) {
        let newArr = [];
        for (let entry of arr) {
            //let obj = Object.assign({},entry)
            let obj = Object.assign({}, entry);
            newArr.push(obj);
        }
        return newArr;
    }
}
exports.default = DataStore;
//# sourceMappingURL=DataStore.js.map
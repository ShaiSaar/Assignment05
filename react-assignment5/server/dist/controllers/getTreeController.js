"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services = require("../services");
async function GetTreeController(req, res) {
    const tree = await services.GetTree();
    //res.json({ answer: tree })
    //let parse = JSON.parse(tree)
    //console.log(tree)
    //res.json(tree)
    res.send(tree);
}
exports.GetTreeController = GetTreeController;
;
async function GetFullTreeController(req, res) {
    let groupy = await services.getGroups(); //arr groups
    let usery = await services.getUsers(); // arr users
    let groups = [...groupy];
    let users = [...usery];
    let userOBJ = arrayToObject(users); // turn to obj
    let groupOBJ = arrayToObject(groups); // turn to obj
    groups = assignObjectsToGroup(groups, userOBJ);
    groups = assignObjectsToGroup(groups, groupOBJ);
    let finalTree = createFinalTree(groups);
    //res.send({groups,users})
    res.send(finalTree);
}
exports.GetFullTreeController = GetFullTreeController;
;
const arrayToObject = (arr) => {
    let newObj = {};
    for (let entry of arr) {
        newObj[`${entry.id}`] = entry;
    }
    return newObj;
};
const assignObjectsToGroup = (groupsArr, usersObj) => {
    let groupsWithUsers = groupsArr;
    for (let entry of groupsWithUsers) {
        if (entry['items'].length > 0) {
            let arrOfUsers = [];
            for (let user of entry['items']) {
                if (!!usersObj[user]) {
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
const createFinalTree = (groupsArr) => {
    let arr = [];
    for (let entry of groupsArr) {
        if (!entry[`parent`]) {
            arr.push(entry);
        }
    }
    return arr;
};
//# sourceMappingURL=getTreeController.js.map
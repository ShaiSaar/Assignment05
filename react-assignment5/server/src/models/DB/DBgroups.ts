import * as util from "util";
import Group from "../Moduls/Group"

const fs = require('fs');

const readFileSync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);

export default class DBgroups {
    data: any
    path:string
    constructor() {
        //
        this.path = `./Json/Groups.json`;
        this.readFromJson()
            .then((data)=> {
                //console.log(`finished constructor:`,data)
                this.data = data
            })
            .catch((err)=>console.log(err));
    }

    static instance;

    static getInstance() {
        if (!DBgroups.instance) {
            DBgroups.instance =  new DBgroups();
        }

        return DBgroups.instance;
    }

    async readFromJson() {
        let data = await readFileSync(this.path);
        return JSON.parse(data);
    }

    writeToJson() {
        writeFileSync(this.path, JSON.stringify(this.data));
    }

    getGroups() {
        return new Promise((resolve) => {
            let newArr = this.getNewGroupsFromState(this.data)
            resolve(newArr);
        });
    }

    getNewGroupsFromState(arr){
        let newArr = []
        for(let entry of arr){
            //let obj = Object.assign({},entry)
            let obj = {...entry}
            newArr.push(obj)
        }
        return newArr
    }

    createGroup(group) {
        return new Promise((resolve) => {
            console.log("this.data=======>",this.data)
            this.data.push(group);
            this.writeToJson();
            resolve(group);

        });
    }

    checkIfGroupExist(name) {
        return new Promise((resolve) => {
            if(!this.data){
                this.data = []
                resolve(false)
                return
            }
            let index = this.data.findIndex(indx => indx.name == name )
            if(index===-1){
                resolve(false);
                return;
            }
            resolve(true);
        });
    }

    getGroup(id) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.id == id )
            if(index===-1){
                resolve("No Group found");
                return;
            }
            resolve(this.data[index]);
        });
    }

    updateGroup(id,groupBody) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.id == id )
            console.log("groupBody", groupBody)
            if(index===-1){
                resolve("No Group found");
                return;
            }
            let updatedGroup = Object.assign({}, this.data[index], groupBody);
            this.data[index] = updatedGroup
            console.log(">>>>>>>>>>>>>>>>data",this.data[index]);
            console.log(">>>>>>>>>>>>>>>>>>>groupbody", groupBody);

            this.writeToJson();
            resolve(this.data[index]);
        });
    }

    deleteGroup(id) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.id == id )
            if(index===-1){
                resolve("No Group found asdasdasd");
                return;
            }
            let counter = 0
            //delete the group
            // this.data.splice(index,1)
            // //delete group from the items of group
            // let counter = 0
            // for (let entry of this.data){
            //     for (let i = 0; i < entry['items'].length; i++) {
            //         if(entry['items'][i]==id){
            //             entry['items'].splice(i,1)
            //             counter++
            //             console.log(`Group ${id} was deleted from ${entry.name}`)
            //         }
            //     }
            // }
            // this.writeToJson();
            resolve(`Group has been deleted from ${counter} groups`);
        });
    }

    deleteUserFromGroup(id) {
        return new Promise((resolve) => {

            //delete user from the items of group
            for (let entry of this.data){
                for (let i = 0; i < entry.items.length; i++) {
                    if(entry.items[i]==id){
                        entry.items.splice(i,1)
                        console.log(`Group ${id} was deleted from ${entry.name}`)
                    }
                }
            }
            this.writeToJson();
            resolve("Group has been deleted");
        });
    }


}

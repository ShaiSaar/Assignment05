import * as util from "util";
import User from "../Moduls/User"

const fs = require('fs');

const readFileSync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);

export default class DBusers {
    data: any
    path:string
    constructor() {
        //
        this.path = `./Json/Users.json`
        this.readFromJson()
            .then((data)=> {
                //console.log(`finished constructor:`,data)
                this.data = data
            })
            .catch((err)=>console.log(err));
    }

    static instance;

    static getInstance() {
        if (!DBusers.instance) {
            DBusers.instance =  new DBusers();
        }

        return DBusers.instance;
    }

    async readFromJson() {
        let data = await readFileSync(this.path);
        // if (data.length===0){
        //    return this.data = []
        // }
        return JSON.parse(data);
    }

     writeToJson() {
         writeFileSync(this.path, JSON.stringify(this.data));
    }

    getUsers() {
        return new Promise((resolve) => {
            let newArr = this.getNewUserssFromState(this.data)
            resolve(newArr);
        });
    }
    getNewUserssFromState(arr){
        let newArr = []
        for(let entry of arr){
            //let obj = Object.assign({},entry)
            let obj = {...entry}
            newArr.push(obj)
        }
        return newArr
    }
    getUserById() {
        return new Promise((resolve) => {
            resolve(this.data);
        });
    }

    createUser(user) {
        return new Promise((resolve) => {
            console.log("this.data=======>",this.data)
                this.data.push(user);
                this.writeToJson();
                resolve(user);

        });
    }

    getUser(id) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.id == id )
            if(index===-1){
                resolve("No user found");
                return;
            }
            const userCopy = {...this.data[index]}
            delete userCopy.password
            resolve(userCopy);
        });
    }

    getUserByName(name, password) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.name == name )
            // console.log("DB Users index", index)
            // console.log("DB Users user", this.data[index])
            if(index===-1){
                console.log("index===-1")
                resolve(false);
                return;
            }

            let user = this.data[index]
            if(user.password != password+""){
                // console.log("user.password != password")
                // console.log("user.password",user)
                // console.log("client password",password)

                resolve(false);
                return;
            }
            const userCopy = {...this.data[index]}
            delete userCopy.password
            resolve(userCopy);
        });
    }

    checkIfUserExist(name) {
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

    updateUser(id,userBody) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.id == id )
            if(index===-1){
                resolve("No user found");
                return;
            }
            let updatedUser = {...this.data[index],...userBody}
            this.data[index] = updatedUser
            this.writeToJson();
            resolve(this.data[index]);
        });
    }

    deleteUser(id) {
        return new Promise((resolve) => {
            let index = this.data.findIndex(indx => indx.id == id )
            if(index===-1){
                resolve("failed");
                return;
            }
            this.data.splice(index,1)
            this.writeToJson();
            resolve("success");
        });
    }


}

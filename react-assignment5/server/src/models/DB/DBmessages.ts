import * as util from "util";
import Group from "../Moduls/Group"

const fs = require('fs');

const readFileSync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);

export default class DBmessages {
    data: object
    path:string
    constructor() {
        //
        this.path = `./Json/Messages.json`
        this.readFromJson()
            .then((data)=> {
                //console.log(`finished constructor:`,data)
                this.data = data
            })
            .catch((err)=>console.log(err));
    }

    static instance;

    static getInstance() {
        if (!DBmessages.instance) {
            DBmessages.instance =  new DBmessages();
        }

        return DBmessages.instance;
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

    getMessages() {
        return new Promise((resolve) => {
            resolve(this.data);
        });
    }

    createMessage(Message, groupId) {
        return new Promise((resolve) => {
            console.log("this.data=======>",this.data)
            if(!this.data[`${groupId}`]){
                this.data[`${groupId}`] = []
            }
            this.data[`${groupId}`].push(Message);
            this.writeToJson();
            resolve(Message);

        });
    }

    getMessagesById(id) {
        return new Promise((resolve) => {
            let usersMessages = this.data[`${id.toString()}`]
            console.log("usersMessages ", usersMessages)
            if (usersMessages){
                console.log("usersMessages exist", usersMessages)
                resolve(usersMessages)
            }else {
                this.data[`${id.toString()}`]=[]
                this.writeToJson();
                console.log("usersMessages was created", this.data[`${id.toString()}`])
                resolve([])
            }
        });
    }

}

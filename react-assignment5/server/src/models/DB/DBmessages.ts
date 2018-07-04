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

    createMessage(convObj: object, userObj:object, value:string) {
        return new Promise((resolve) => {
            // console.log("this.data=======>",this.data)
            // if(!this.data[`${groupId}`]){
            //     this.data[`${groupId}`] = []
            // }
            // this.data[`${groupId}`].push(Message);
            // this.writeToJson();
            // resolve(Message);
            ///////////////////

            let today = new Date()
            let msg = {
                classType: "me",
                senderName: userObj['name'],
                senderID: userObj['id'],
                convType: convObj['type'],
                convName: convObj['name'],
                convID: convObj['id'],
                senderContent: value,
                senderDate: "sent at " + today.toLocaleTimeString() + " " + today.toLocaleDateString()
            }
            //console.log("msg.classType 1", msg.classType)
            let senderID= userObj['id']
            let convID = convObj['id']
            if(!(this.data[senderID])){
                this.data[senderID]={}
            }
            if(!(this.data[senderID][convID])){
                this.data[senderID][convID]=[]
            }
            this.data[senderID][convID].push(msg)

            if(convObj['type']==="user"){
                if(!(this.data[convID])){
                    this.data[convID]={}
                }
                if(!(this.data[convID][senderID])){
                    this.data[convID][senderID]=[]
                }
                this.data[convID][senderID].push(msg)
            }
            // let msg2 = Object.assign({}, msg)
            // msg2.classType = "notMe"
            // msg2.senderContent += msg.classType
            // this.state[key].push(msg2)
            // console.log("msg.classType 2", msg2.classType)
            resolve(msg);


            ////////////////////
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

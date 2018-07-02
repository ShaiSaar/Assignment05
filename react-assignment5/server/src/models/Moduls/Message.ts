
interface IMessage {
    id: number
    senderID:number
    senderName:string
    date:string
    content:string
}

export default class Message implements IMessage{

    id: number
    senderID:number
    senderName:string
    date:string
    content:string

    constructor(senderID, senderName, content){
        let today = new Date()
        this.id = Math.abs(today.getTime())
        this.senderID = senderID
        this.senderName= senderName
        this.date = today.toLocaleDateString() +" "+ today.toLocaleTimeString()
        this.content=content
    }

    getId =()=>{
        return this.id
    }
    getDate =()=>{
        return this.date
    }

    getSenderID =()=>{
        return this.senderID
    }
    setSenderID =(senderID)=>{
        this.senderID = senderID
    }
    getSenderName =()=>{
        return this.senderID
    }
    setSenderName =(senderName)=>{
        this.senderName = senderName
    }
    getContent =()=>{
        return this.content
    }
    setContent =(content)=>{
        this.content = content
    }

    // addToUsers=(obj)=>{
    //     this.users.push(obj)
    // }
    // removeFromUsers=(objId)=>{
    //     let index = this.users.findIndex(entry=> entry["id"]===objId)
    //     if(index===-1){
    //         return false
    //     }else {
    //         this.users.splice(index,1)
    //         return true
    //     }
    // }
    // addToGroups=(obj)=>{
    //     this.groups.push(obj)
    // }
    // removeFromGroups=(objId)=>{
    //     let index = this.groups.findIndex(entry=> entry["id"]===objId)
    //     if(index===-1){
    //         return false
    //     }else {
    //         this.groups.splice(index,1)
    //         return true
    //     }
    // }
}
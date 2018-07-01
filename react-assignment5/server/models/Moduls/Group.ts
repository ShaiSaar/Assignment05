/*
id++
type- "group"
name- string
parent - number
Users - [User]
Groups - [Group]

 */

interface IGroup {
    id: number
    type:string
    name:string
    items:object[]
}

export default class Group implements IGroup{

    id: number
    parent: number | null
    type:string
    name:string
    items:any[]

    constructor(name, parent){
        let today = new Date()
        this.id = Math.abs(today.getTime())
        this.parent = parent || null
        this.type= 'group'
        this.name = name
        this.items=[]
    }

    getId =()=>{
        return this.id
    }
    getType =()=>{
        return this.type
    }

    getName =()=>{
        return this.name
    }
    setName =(name)=>{
        this.name = name
    }

    addToItems=(obj)=>{
        this.items.push(obj)
    }
    removeFromItems=(objId)=>{
        let index = this.items.findIndex(entry=> entry["id"]===objId)
        if(index===-1){
            return false
        }else {
            this.items.splice(index,1)
            return true
        }
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
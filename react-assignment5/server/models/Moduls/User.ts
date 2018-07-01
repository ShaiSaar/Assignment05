/*
id++
type- "user"
Age- number
name- string
password- hash
parent- [number]

 */

interface IUser {
    id: number
    type:string
    age:number
    name:string
    password:string
    parent:number[]
}

export default class User implements IUser{

    id: number
    type:string
    age:number
    name:string
    password:string
    parent:number[]

    constructor(name,password, age){
        let today = new Date()
       this.id = Math.abs(today.getTime())
        this.type= 'user'
        this.name = name
        this.age=age
        this.password= password+""
        this.parent=[]
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

    getAge =()=>{
        return this.age
    }
    setAge =(age)=>{
        this.age = age
    }
    getPassword =()=>{
        return this.age
    }
    setPassword =(Password)=>{
        this.password = Password
    }
    addToParent=(id)=>{
        this.parent.push(id)
    }
    removeFromParent=(id)=>{
        let index = this.parent.findIndex(i=> i===id)
        if(index===-1){
            return false
        }else {
            this.parent.splice(index,1)
            return true
        }
    }
}
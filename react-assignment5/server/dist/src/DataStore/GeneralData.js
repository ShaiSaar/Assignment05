"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {Request, Response} from "express";
//import * as services from "../../server/services";
class GeneralData {
    constructor() {
        this.state = {
            shai: "123",
            ariel: "123",
            ohad: "123"
        };
    }
    // state = {
    //     users: [],
    //     groups:[],
    //     messages:{}
    // }
    // constructor(){
    //     this.state = {
    //         users: {id:123, name:"Yo-Yo"},
    //         groups:null,
    //         messages:null
    //     }
    //     this.getUsers=()=>{
    //     return fetch('http://localhost:4000/users/getUsers')
    //         .then((result) => result.json()).then(
    //         (result) => {
    //             this.state.users = result.answer
    //             console.log("GeneralData - users", this.state.users)
    //         }
    //     )
    //     };
    // }
    get(key) {
        if (!this.state[key]) {
            return null;
        }
        return this.state[key];
    }
    set(key, value) {
        this.state[key] = value;
        return true;
    }
}
GeneralData.getInstance = () => {
    if (GeneralData.instance === null)
        GeneralData.instance = new GeneralData();
    return GeneralData.instance;
};
exports.default = GeneralData;
//# sourceMappingURL=GeneralData.js.map
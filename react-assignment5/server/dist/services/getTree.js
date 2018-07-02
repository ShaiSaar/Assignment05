"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model = require("../models/index");
async function fetchTree() {
    //const tree = await Model.getTree()
    return await Model.GetTree();
    // return new Promise((resolve, reject)=>{
    //
    //     resolve("this is the tree")
    // })
}
exports.default = fetchTree;
//# sourceMappingURL=getTree.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function fetchTree() {
    const tree = fs.readFile("./tree.json", (err, data) => {
        if (err)
            throw err;
        return JSON.parse(tree);
    });
    // tree = "I cant fetch a json file"
}
exports.default = fetchTree;
//# sourceMappingURL=fetchTree.js.map
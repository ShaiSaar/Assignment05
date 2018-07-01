"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util = require("util");
const readFileSync = util.promisify(fs.readFile);
const watchFileSync = util.promisify(fs.watchFile);
async function fetchTree() {
    const path = ".\/server\/models\/DB\/Json\/tree.json";
    try {
        const result = await readFileSync(path, { encoding: 'utf8' });
        return JSON.parse(result);
    }
    catch (e) {
        throw new Error(`Failed to read db file with error ${e}`);
    }
}
exports.default = fetchTree;
//# sourceMappingURL=fetchTree.js.map
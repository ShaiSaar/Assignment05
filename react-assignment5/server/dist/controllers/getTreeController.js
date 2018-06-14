"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services = require("../services");
async function getTreeController(req, res) {
    const tree = await services.GetTree();
    res.json({ answer: tree });
}
exports.default = getTreeController;
;
//# sourceMappingURL=getTreeController.js.map
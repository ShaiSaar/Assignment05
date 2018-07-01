"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Controller = require("../controllers");
const router = express.Router();
//TREE
router.get('/', Controller.GetTreeController);
router.get('/getFullTree', Controller.GetFullTreeController);
exports.default = router;
//# sourceMappingURL=tree.js.map
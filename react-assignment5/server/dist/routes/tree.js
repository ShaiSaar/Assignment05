"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Controller = require("../controllers");
const router = express.Router();
router.get('/', Controller.GetTreeController);
exports.default = router;
//# sourceMappingURL=tree.js.map
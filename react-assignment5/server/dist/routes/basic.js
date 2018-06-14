"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.send('this is the basic page');
});
exports.default = router;
//# sourceMappingURL=basic.js.map
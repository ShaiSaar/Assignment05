"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const Routes = require("./routes/index");
const app = express();
app.use(cors());
//routes here
app.use('/tree', Routes.TreeRoute);
app.use('/users', Routes.UsersRoute);
app.use('/groups', Routes.GroupsRoute);
app.use('/messages', Routes.MessagesRoute);
app.use('/', Routes.Basic);
//static files
app.use(express.static('..\/public'));
exports.default = app;
//# sourceMappingURL=app.js.map
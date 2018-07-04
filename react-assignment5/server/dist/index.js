"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const DBmanager_1 = require("./models/DB/DBmanager");
//import SocketIO from './socketIO'
const socket = require('socket.io');
DBmanager_1.default();
const server = http.createServer(app_1.default);
// SocketIO(server)
const io = socket(server);
io.on('connection', socket => {
    console.log('User connected');
    socket.on('login', (data) => {
        console.log(`User ${data.name.id} signed in`);
    });
    socket.on('logout', (data) => {
        console.log(`User ${data.name.id} logged out`);
    });
    socket.on('msg sent', (data) => {
        //console.log(`User ${userConnected} sent a msg`)
        socket.broadcast.emit("gotMessage", { msg: data.msg, conv: data.conv });
        //io.sockets.emit("gotMessage", {msg:data.msg, conv:data.conv})
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(4000, () => {
    console.log("listening on port 4000");
});
//# sourceMappingURL=index.js.map
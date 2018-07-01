"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket = require('socket.io');
function SocketIO(server) {
    const io = socket(server);
    io.on('connection', (socket) => { console.log('made socket connection', socket); });
}
exports.default = SocketIO;
//# sourceMappingURL=socketIO.js.map
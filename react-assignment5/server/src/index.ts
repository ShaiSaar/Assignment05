import * as http from 'http'
import app from './app'
import DB_initialize from './models/DB/DBmanager'
//import SocketIO from './socketIO'
const socket = require('socket.io')

DB_initialize()

const server = http.createServer(app);

// SocketIO(server)

const io = socket(server)

io.on('connection', socket => {
    console.log('User connected')

    socket.on('login', (data) => {
        console.log(`User ${data.name.id} signed in`)
    })

    socket.on('logout', (data) => {
        console.log(`User ${data.name.id} logged out`)

    })

    socket.on('msg sent', (data) => {
        //console.log(`User ${userConnected} sent a msg`)
        socket.broadcast.emit("gotMessage", {msg:data.msg, conv:data.conv})
        //io.sockets.emit("gotMessage", {msg:data.msg, conv:data.conv})
    })

    socket.on('disconnect', () => {
        console.log('user disconnected', )
    })
})

server.listen(4000,()=>{
    console.log("listening on port 4000")
})


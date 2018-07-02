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

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(4000,()=>{
    console.log("listening on port 4000")
})


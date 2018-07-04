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
    let userConnected =""

    socket.on('login', (data) => {
        console.log(`User ${data.name} signed in`)
        userConnected = data.name
    })

    socket.on('msg sent', (data) => {
        //console.log(`User ${userConnected} sent a msg`)
        console.log(`User ${data.action} sent a msg`)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(4000,()=>{
    console.log("listening on port 4000")
})


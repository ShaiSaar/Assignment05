const socket = require('socket.io')

function SocketIO (server){

    const io = socket(server)
    io.on('connection',(socket)=>{console.log('made socket connection', socket)})




}
export default SocketIO
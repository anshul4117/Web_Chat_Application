const { log } = require('console')
const express = require('express')
const { Socket } = require('socket.io')
const app = express()

const http = require('http').createServer(app)


const Port = process.env.Port || 4500

http.listen(Port, () => {
    console.log(`Listening Port ${Port} `);
})


app.use(express.static(__dirname + '/box'))
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

// socket

const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('Connection..');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })

})
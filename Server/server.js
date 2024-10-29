const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const clientLandingPage = path.join(__dirname, '../','/Client/index.html');
app.get('/', (req, res)=> {
    res.sendFile(clientLandingPage)
});

server.listen(2000, () => {
    console.log('server is running on port 2000');
});

let players = {};

io.on('connection', (socket) => {
    console.log('user connected');
    players[socket.id] = { x: 0, y: 0};

    socket.on('move', (data) => {
        players[socket.id].x += data.dx;
        players[socket.id].y += data.dy;
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

let framerate = 30;
setInterval(function() {
    io.emit('state', players);
}, 1000/framerate);
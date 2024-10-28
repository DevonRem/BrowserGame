const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const clientLandingPage = path.join(__dirname, '../','/client/index.html');
app.get('/', (req, res)=> {
    res.sendFile(clientLandingPage)
});

server.listen(2000, () => {
    console.log('server is running on port 2000');
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
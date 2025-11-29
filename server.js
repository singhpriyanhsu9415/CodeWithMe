const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');   // webSocket instance
const ACTIONS = require('./src/Actions');

const server = http.createServer(app); // server
const io = new Server(server);         // io  here is a webSocket which act as a backend where other socket connects with diff roomId

app.use(express.static(path.join(__dirname, 'build')));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(  // storing all socketId -> username  with same roomId
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {  // socket is trying join  io and  io (webSocket)  is linstening this socket
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {  // on receiveing a join req 
        userSocketMap[socket.id] = username;
        socket.join(roomId);   // socket (user) joined the room
        const clients = getAllConnectedClients(roomId);  // updating all joined clients
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {   // io  is sending info about this new socket joined to every other users (sockets)
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const express = require('express');
const {WebSocket, WebSocketServer} = require('ws');

const app = express();
const port = 3000;

const server = app.listen(port, () => {
    console.log(`http server is running on ${port}`);
});


wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', function(message) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message, { binary: false });
            }
        });
    });
});


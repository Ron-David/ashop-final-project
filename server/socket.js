const express = require('express');
const ws = require('ws');
const { controller } = require('./Controller');

const app = express();

class Socket {
    init() {
        // Set up a headless websocket server that prints any
        // events that come in.
        const wsServer = new ws.Server({ noServer: true });
        wsServer.on('connection', socket => {
            socket.on('message', message => {
                let purchased = JSON.parse(message)

                for (const pur of purchased) {
                    controller.purchased(pur.barcode, pur.quantity)
                }
            });
        });

        // `server` is a vanilla Node.js HTTP server, so use
        // the same ws upgrade process described here:
        // https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
        const server = app.listen(3001);
        server.on('upgrade', (request, socket, head) => {
            wsServer.handleUpgrade(request, socket, head, socket => {
                wsServer.emit('connection', socket, request);
            });
        });
    }
}

const wsServer = new Socket()

module.exports = { wsServer }
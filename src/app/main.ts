import express from 'express';
import path from 'path';
import { WebSocketServer } from 'ws';
import ApiRouter from './api/api';
import { handleWebsocketConnection } from './api/ws';
import { handleWebhookRequest } from './api/webhook';
import handleAuthentication from './auth/auth';

async function run() {
    const app = express();

    app.use((req, res) => {

        res.set('Access-Control-Allow-Origin', 'https://luckytts.web.app/');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

        res.next();
    });

    app.use('/webhook/twitch/callback', handleWebhookRequest);
    app.use('/api', ApiRouter);
    app.use('/auth', handleAuthentication);

    app.use('/', express.static('public'));

    const wsServer = new WebSocketServer({ noServer: true });
    wsServer.on('connection', socket => {
        handleWebsocketConnection(socket);
    });

    const server = app.listen(3000);
    server.on('upgrade', (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, socket => {
            wsServer.emit('connection', socket, request);
        });
    });

    console.log(`Server started on port http://localhost:${server.address().port}`);
}

run();
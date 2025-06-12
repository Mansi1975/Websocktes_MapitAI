const http = require('http');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

const PORT = 8080;
const staticPath = path.join(__dirname, 'static');

const server = http.createServer((req, res) => {
    const filePath = req.url === '/' ? path.join(staticPath, 'index.html') : path.join(staticPath, req.url);
    const ext = path.extname(filePath);
    
    const contentType = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
    }[ext] || 'text/plain';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
    console.log("Client connected");

    // ws.on('message', (message) => {
    //     const msgText = message.toString();
    //     console.log("Received: " + msgText);
    //     wss.clients.forEach(client => {
    //         if (client.readyState === WebSocket.OPEN) {
    //             client.send(message.msgText);
    //         }
    //     });
    // });
    ws.on('message', (message) => {
    const msgText = message.toString();
    console.log("Raw message: " + msgText);

    try {
        const msgObj = JSON.parse(msgText);
        console.log(`From ${msgObj.sender}: ${msgObj.text}`);
    } catch (err) {
        console.log("Could not parse message as JSON:", err);
    }

    // Broadcast
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msgText);
        }
    });
});


    ws.on('close', () => console.log("Client disconnected"));
});

server.listen(PORT, () => {
    console.log(`WebSocket server running at http://localhost:${PORT}`);
});

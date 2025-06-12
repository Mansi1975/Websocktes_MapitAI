const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8081;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON payload

let clients = [];

app.get('/poll', (req, res) => {
    console.log("📡 New client polling");
    // Keep connection open until we have something to send
    clients.push(res);
});

app.post('/send', (req, res) => {  // 🔁 Fix route to '/send' to match frontend
    const { message } = req.body;
    console.log("📨 Message received:", message);

    // Send the message to all waiting clients
    clients.forEach(client => {
        client.send(message);
    });

    // Clear the clients list
    clients = [];
    res.status(200).end();
});

app.listen(PORT, () => {
    console.log(`📡 Long Polling server running at http://localhost:${PORT}`);
});

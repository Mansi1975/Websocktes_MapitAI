     const username = window.prompt?.("Enter your name:") || "Anonymous";
    const ws = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host + '/ws');
    const messages = document.getElementById('messages');

    ws.onmessage = function(event) {
        let msgData = {};
        try {
            msgData = JSON.parse(event.data);
        } catch (e) {
            msgData = { sender: "Unknown", text: event.data };
        }

        const msg = document.createElement('div');
        msg.classList.add('msg');
        msg.textContent = (msgData.sender === username) 
            ? `You: ${msgData.text}` 
            : `${msgData.sender}: ${msgData.text}`;
        msg.classList.add(msgData.sender === username ? 'right' : 'left');
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
    };

    function sendMessage() {
        const input = document.getElementById('msg');
        if (input.value) {
            const msgObj = {
                sender: username,
                text: input.value
            };
            ws.send(JSON.stringify(msgObj));
            input.value = '';
        }
    }

    document.getElementById('msg').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
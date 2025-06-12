const ws = new WebSocket("ws://localhost:8000/ws");

ws.onopen = () => {
    appendMessage("✅ Connected to WebSocket server");
};

ws.onmessage = (event) => {
    appendMessage("📩 " + event.data);
};

ws.onerror = (error) => {
    appendMessage("❌ Error: " + error.message);
};

ws.onclose = () => {
    appendMessage("🔌 Disconnected from server");
};

function sendMessage() {
    const input = document.getElementById("msg");
    const msg = input.value.trim();
    if (msg === "") return;

    ws.send(msg);
    appendMessage("🧑 You: " + msg);
    input.value = "";
}

function appendMessage(message) {
    const messagesDiv = document.getElementById("messages");
    const div = document.createElement("div");
    div.textContent = message;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

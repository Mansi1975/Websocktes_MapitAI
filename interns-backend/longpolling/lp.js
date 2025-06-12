const chat = document.getElementById("messages");
const input = document.getElementById("msg");

function poll() {
  fetch("http://localhost:8081/poll")
    .then(res => res.text())
    .then(msg => {
      const div = document.createElement("div");
      div.textContent = msg;
      div.classList.add("msg", "left"); // Incoming message
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
      poll(); // Continue polling
    })
    .catch(() => setTimeout(poll, 1000)); // Retry on failure
}

function sendMessage() {
  if (input.value) {
    const msg = input.value;
    const div = document.createElement("div");
    div.textContent = "You: " + msg;
    div.classList.add("msg", "right"); // Outgoing message
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;

    fetch("http://localhost:8081/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }), // Correct body
    });

    input.value = "";
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

poll(); // Start polling immediately

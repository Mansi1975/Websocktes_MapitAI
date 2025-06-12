# WebSocket Chat 


# Backend - Websockets

Status: In Progress
Date Asked: June 8, 2025
Follow-up Required: No

<aside>
💡

**Objective**

Implement a lightweight backend that can handle thousands of WebSocket connections using limited hardware resources. 

</aside>

<aside>

### **Problem Statement**

1. Research and justify your choice of framework and language for implementing WebSockets. Explain how web frameworks optimize and handle concurrent connections. Select a framework capable of managing hundreds of thousands of open connections—either WebSocket or long-polling connections. Analyze the tradeoffs between these approaches. For a notifications API and a chat API what connections type will you choose. 
2. Implement a live chat feature with your choice of framework with minimal html page. 
</aside>

<aside>

### Deliverables

1. Share your GitHub repository with the user `edme-tutor`, including your roll number and a detailed README file.
2. Your previous project portfolio, if available. 
</aside>

<aside>

### Submission Timeline

June 11, Wednesday 11:59 PM.

</aside>

## Overview
This repository contains a reference implementation and test framework for a minimal WebSocket-based chat application. The goal of this task is to evaluate your ability to implement a real-time chat feature using WebSockets, and to validate its performance under load.

---

## Reference Server
A reference Go server is included for testing and demonstration purposes. 

To run the reference server:

```bash
bash main
```

- This will start a WebSocket server on `localhost:8080`.
- You can access the sample chat UI at: [http://localhost:8080](http://localhost:8080)
- Open multiple browser windows/tabs to test real-time chat functionality.

---

## Your Task
1. Compare different frameworks and see how they handle different websocket or long polling connections. Explore the concepts and write down the comparison in a README.md file.
2. **Implement a WebSocket chat server** in your preferred language/framework which works in scale.
3. **Create a simple HTML/JS chat UI** that connects to your server  ( or use the provided `static/index.html` as a reference if needed).

---

## Load Testing with Locust
A load testing framework is provided in the `tests/` directory using [Locust](https://locust.io/).

- The test simulates multiple users connecting to the WebSocket endpoint and exchanging messages.
- The endpoint URL is configured via the `.env` file.

### How to Run the Load Test

1. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
2. Edit `.env` if your WebSocket endpoint is different from the default (`ws://localhost:8080/ws`).
3. Run the test:
    ```bash
    make test
    ```

---

## Guidelines
- You may use any programming language or framework for your server implementation.
- Your server should be compatible with the provided HTML/JS UI and Locust test.
- Focus on clarity, correctness, and simplicity.
- Document any assumptions or setup steps in your own README or comments.

---

## Provided Files
- `static/index.html` - Reference chat UI (connects to `/ws` endpoint)
- `tests/locustfile.py` - Locust load test script
- `.env` - WebSocket endpoint configuration for Locust
- `requirements.txt` - Python dependencies for testing
- `Makefile.dev` - Useful commands for running and testing

---

## Support
If you have questions about the requirements or setup, please contact the recruitment team.

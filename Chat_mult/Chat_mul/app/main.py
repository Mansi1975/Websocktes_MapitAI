from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()
active_connections = []

# Allow all CORS origins for simplicity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    # while True:
    #     try:
    #         data = await websocket.receive_text()
    #         print(f"Received from client: {data}")
    #         await websocket.send_text(f"You said: {data}")
    #     except Exception as e:
    #         print("Connection closed:", e)
    #         break
    try:
        while True:
            data = await websocket.receive_text()
            for conn in active_connections:
                await conn.send_text(f"{data}")
    except WebSocketDisconnect:
        active_connections.remove(websocket)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)        

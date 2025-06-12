import os
import time
from locust import User, task, events
from locust.env import Environment
from locust.runners import STATE_STOPPING, STATE_STOPPED, STATE_CLEANUP
from websocket import create_connection
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

WS_URL = os.getenv("WS_URL", "ws://localhost:8080/ws")

class WebSocketUser(User):
    abstract = True

    def on_start(self):
        self.ws = create_connection(WS_URL)

    def on_stop(self):
        self.ws.close()

class ChatUser(WebSocketUser):
    @task
    def send_and_receive(self):
        msg = "hello from locust"
        start_time = time.time()

        try:
            self.ws.send(msg)
            response = self.ws.recv()
            total_time = int((time.time() - start_time) * 1000)

            # ✅ This makes Locust track the request
            self.environment.events.request.fire(
                request_type="websocket",
                name="send_and_receive",
                response_time=total_time,
                response_length=len(response),
                exception=None
            )

        except Exception as e:
            total_time = int((time.time() - start_time) * 1000)
            self.environment.events.request.fire(
                request_type="websocket",
                name="send_and_receive",
                response_time=total_time,
                response_length=0,
                exception=e
            )

# Graceful shutdown for WebSocket connections
@events.test_stop.add_listener
def _(environment, **kwargs):
    for user_class in environment.runner.user_classes:
        if hasattr(user_class, 'ws'):
            try:
                user_class.ws.close()
            except Exception:
                pass

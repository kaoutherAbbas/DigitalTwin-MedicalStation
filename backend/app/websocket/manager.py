from fastapi import WebSocket


class ConnectionManager:

    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):

        print("Nombre de clients :", len(self.active_connections))

        for connection in self.active_connections:
            try:
                print("Envoi à un client :", message)
                await connection.send_json(message)

            except Exception as e:
                print("Erreur WebSocket :", e)


manager = ConnectionManager()
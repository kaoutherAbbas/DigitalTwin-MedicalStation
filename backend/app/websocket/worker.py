from app.websocket.queue import message_queue
from app.websocket.manager import manager


async def websocket_worker():

    while True:

        message = await message_queue.get()

        await manager.broadcast(message)

        message_queue.task_done()
import asyncio


main_loop = None


def set_loop(loop):
    global main_loop
    main_loop = loop



def send_websocket_message(message):

    if main_loop:

        asyncio.run_coroutine_threadsafe(
            broadcast(message),
            main_loop
        )



async def broadcast(message):

    from app.websocket.manager import manager

    await manager.broadcast(message)
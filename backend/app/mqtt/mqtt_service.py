import json
import time
import threading
import asyncio
from datetime import datetime
from app.websocket.manager import manager
from app.database import SessionLocal
from app.mqtt.client import connect
from app.mqtt.topics import (
    TEMPERATURE_TOPIC,
    HEART_RATE_TOPIC,
    SPO2_TOPIC,
    BLOOD_PRESSURE_TOPIC,
    ECG_TOPIC,
)
from app.mqtt.measurement_handler import save_measurement


client = connect()


def on_connect(client, userdata, flags, reason_code, properties):
    print(f"✅ MQTT connecté (code={reason_code})")

    client.subscribe(TEMPERATURE_TOPIC)
    client.subscribe(HEART_RATE_TOPIC)
    client.subscribe(SPO2_TOPIC)
    client.subscribe(BLOOD_PRESSURE_TOPIC)
    client.subscribe(ECG_TOPIC)

    print("📡 Topics MQTT abonnés")


def on_message(client, userdata, msg):

    start = time.perf_counter()

    payload = json.loads(msg.payload.decode())

    print("=" * 60)
    print("Heure PC :", datetime.now().strftime("%H:%M:%S.%f"))
    print("Payload :", payload)

    db = SessionLocal()

    try:
        t1 = time.perf_counter()

        save_measurement(db, payload)

        t2 = time.perf_counter()

        print(f"save_measurement : {(t2 - t1) * 1000:.2f} ms")

    finally:
        db.close()

    end = time.perf_counter()

    print(f"Temps total : {(end - start) * 1000:.2f} ms")

  


client.on_connect = on_connect
client.on_message = on_message


def start_mqtt():

    def mqtt_loop():
        client.loop_forever()

    thread = threading.Thread(
        target=mqtt_loop,
        daemon=True,
    )

    thread.start()

    print("🚀 Service MQTT démarré")
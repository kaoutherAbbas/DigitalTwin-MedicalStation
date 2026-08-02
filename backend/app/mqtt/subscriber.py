import json

from app.mqtt.client import connect
from app.mqtt.topics import *
from app.database import SessionLocal
from app.mqtt.measurement_handler import save_measurement


def on_connect(client, userdata, flags, reason_code, properties):

    print(f"Connecté au broker MQTT (code={reason_code})")

    client.subscribe(TEMPERATURE_TOPIC)
    client.subscribe(HEART_RATE_TOPIC)
    client.subscribe(SPO2_TOPIC)
    client.subscribe(BLOOD_PRESSURE_TOPIC)
    client.subscribe(ECG_TOPIC)


def on_message(client, userdata, msg):

    payload = json.loads(msg.payload.decode())

    print("\nMessage reçu")

    print(payload)

    db = SessionLocal()

    try:

        save_measurement(
            db,
            payload
        )

    finally:

        db.close()


client = connect()

client.on_connect = on_connect
client.on_message = on_message

client.loop_forever()
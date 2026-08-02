import json
from datetime import datetime

from app.mqtt.client import connect
from app.mqtt.topics import TEMPERATURE_TOPIC

client = connect()

payload = {
    "patient_id": 1,
    "sensor": "Temperature",
    "value": 36.9,
    "timestamp": datetime.now().isoformat()
}

client.publish(
    TEMPERATURE_TOPIC,
    json.dumps(payload)
)

print("Message envoyé :")
print(payload)

client.disconnect()
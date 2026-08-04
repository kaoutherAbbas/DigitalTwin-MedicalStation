import json
import time
from datetime import datetime

import paho.mqtt.client as mqtt

from temperature import TemperatureSensor
from heart_rate import HeartRateSensor
from spo2 import SpO2Sensor
from blood_pressure import BloodPressureSensor
from ecg import ECGSensor

BROKER = "127.0.0.1"
PORT = 1883

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.connect(BROKER, PORT, 60)
client.loop_start()

sensors = [
    TemperatureSensor(),
    HeartRateSensor(),
    SpO2Sensor(),
    BloodPressureSensor(),
    ECGSensor()
]

print("Medical Station Simulator started...\n")

while True:

    for sensor in sensors:

        payload = {
            "patient_id": sensor.patient_id,
            "sensor": sensor.sensor_name,
            "value": sensor.read(),
            "timestamp": datetime.now().isoformat()
        }

        client.publish(sensor.topic, json.dumps(payload))

        print(payload)

    print("-" * 60)

    time.sleep(1)
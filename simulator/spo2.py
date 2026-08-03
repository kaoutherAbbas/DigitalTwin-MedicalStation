import random

from base_sensor import BaseSensor
from topics import SPO2_TOPIC

class SpO2Sensor(BaseSensor):

    sensor_name = "SpO2"

    topic = SPO2_TOPIC

    def read(self):

        return random.randint(95, 100)
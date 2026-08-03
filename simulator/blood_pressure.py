import random

from base_sensor import BaseSensor
from topics import BLOOD_PRESSURE_TOPIC

class BloodPressureSensor(BaseSensor):

    sensor_name = "Blood Pressure"

    topic = BLOOD_PRESSURE_TOPIC

    def read(self):

        return random.randint(110, 130)
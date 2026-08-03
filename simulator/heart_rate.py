import random

from base_sensor import BaseSensor
from topics import HEART_RATE_TOPIC

class HeartRateSensor(BaseSensor):

    sensor_name = "Heart Rate"

    topic = HEART_RATE_TOPIC

    def read(self):

        return random.randint(60, 100)
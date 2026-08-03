import random

from base_sensor import BaseSensor
from topics import ECG_TOPIC

class ECGSensor(BaseSensor):

    sensor_name = "ECG"

    topic = ECG_TOPIC

    def read(self):

        return round(random.uniform(-1.0, 1.0), 3)
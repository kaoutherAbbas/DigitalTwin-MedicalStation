import random

from base_sensor import BaseSensor


class TemperatureSensor(BaseSensor):

    sensor_name = "Temperature"

    topic = "medical/temperature"

    def read(self):

        return round(random.uniform(36.4, 37.4), 1)
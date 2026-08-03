from abc import ABC, abstractmethod


class BaseSensor(ABC):

    def __init__(self, patient_id=1):
        self.patient_id = patient_id

    @abstractmethod
    def read(self):
        pass
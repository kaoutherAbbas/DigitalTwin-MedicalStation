from sqlalchemy.orm import Session

from app.models.sensor import Sensor
from app.repositories.sensor_repository import SensorRepository
from app.schemas.sensor import SensorCreate
from fastapi import HTTPException

class SensorService:

    @staticmethod
    def create_sensor(db: Session, data: SensorCreate):

        sensor = Sensor(
            name=data.name,
            unit=data.unit,
        )

        return SensorRepository.create(db, sensor)

    @staticmethod
    def get_sensors(db: Session):
        return SensorRepository.get_all(db)

    @staticmethod
    def get_sensor(db: Session, sensor_id: int):
        sensor = SensorRepository.get_by_id(db, sensor_id)

        if sensor is None:
            raise HTTPException(status_code=404, detail="Sensor not found")

        return sensor

    @staticmethod
    def update_sensor(db: Session, sensor_id: int, data: SensorCreate):

        sensor = SensorRepository.get_by_id(db, sensor_id)

        if sensor is None:
            raise HTTPException(status_code=404, detail="Sensor not found")

        sensor.name = data.name
        sensor.unit = data.unit

        return SensorRepository.update(db, sensor)

    @staticmethod
    def delete_sensor(db: Session, sensor_id: int):

        sensor = SensorRepository.get_by_id(db, sensor_id)

        if sensor is None:
            raise HTTPException(status_code=404, detail="Sensor not found")

        SensorRepository.delete(db, sensor)

        return {"message": "Sensor deleted"}
from sqlalchemy.orm import Session

from app.models.sensor import Sensor


class SensorRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(Sensor).all()

    @staticmethod
    def create(db: Session, sensor: Sensor):
        db.add(sensor)
        db.commit()
        db.refresh(sensor)
        return sensor
    @staticmethod
    def get_by_id(db: Session, sensor_id: int):
        return db.query(Sensor).filter(Sensor.id == sensor_id).first()

    @staticmethod
    def update(db: Session, sensor: Sensor):
        db.commit()
        db.refresh(sensor)
        return sensor

    @staticmethod
    def delete(db: Session, sensor: Sensor):
        db.delete(sensor)
        db.commit()
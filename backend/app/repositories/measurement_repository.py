from sqlalchemy.orm import Session

from app.models.measurement import Measurement


class MeasurementRepository:

    @staticmethod
    def create(db: Session, measurement: Measurement):
        db.add(measurement)
        db.commit()
        db.refresh(measurement)
        return measurement

    @staticmethod
    def get_all(db: Session):
        return db.query(Measurement).all()

    @staticmethod
    def get_by_patient(db: Session, patient_id: int):
        return (
            db.query(Measurement)
            .filter(Measurement.patient_id == patient_id)
            .all()
        )
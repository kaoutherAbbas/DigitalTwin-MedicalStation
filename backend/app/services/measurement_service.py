from sqlalchemy.orm import Session

from app.models.measurement import Measurement

from app.repositories.measurement_repository import (
    MeasurementRepository,
)

from app.schemas.measurement import (
    MeasurementCreate,
)


class MeasurementService:

    @staticmethod
    def create_measurement(
        db: Session,
        data: MeasurementCreate,
    ):

        measurement = Measurement(
            patient_id=data.patient_id,
            sensor_id=data.sensor_id,
            value=data.value,
        )

        return MeasurementRepository.create(
            db,
            measurement,
        )

    @staticmethod
    def get_measurements(db: Session):
        return MeasurementRepository.get_all(db)

    @staticmethod
    def get_patient_measurements(
        db: Session,
        patient_id: int,
    ):
        return MeasurementRepository.get_by_patient(
            db,
            patient_id,
        )
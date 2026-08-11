from sqlalchemy.orm import Session

from app.models.medical_record import MedicalRecord


class MedicalRecordRepository:

    @staticmethod
    def get_by_patient_id(
        db: Session,
        patient_id: int
    ):
        return (
            db.query(MedicalRecord)
            .filter(
                MedicalRecord.patient_id == patient_id
            )
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        medical_record: MedicalRecord
    ):
        db.add(medical_record)
        db.commit()
        db.refresh(medical_record)

        return medical_record

    @staticmethod
    def update(
        db: Session,
        medical_record: MedicalRecord
    ):
        db.commit()
        db.refresh(medical_record)

        return medical_record
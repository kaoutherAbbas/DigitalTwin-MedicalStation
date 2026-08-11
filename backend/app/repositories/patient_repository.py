
from datetime import date

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.patient import Patient


class PatientRepository:

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(Patient)
            .order_by(Patient.last_name.asc(), Patient.first_name.asc())
            .all()
        )

    @staticmethod
    def get_by_id(db: Session, patient_id: int):
        return (
            db.query(Patient)
            .filter(Patient.id == patient_id)
            .first()
        )

    @staticmethod
    def get_by_identity(
        db: Session,
        first_name: str,
        last_name: str,
        date_of_birth: date
    ):
        return (
            db.query(Patient)
            .filter(
                Patient.first_name.ilike(first_name),
                Patient.last_name.ilike(last_name),
                Patient.date_of_birth == date_of_birth
            )
            .first()
        )

    @staticmethod
    def get_last_patient(db: Session):
        return (
            db.query(Patient)
            .order_by(Patient.id.desc())
            .first()
        )

    @staticmethod
    def search(db: Session, query: str):
        query = query.strip()

        if not query:
            return []

        search_pattern = f"%{query}%"

        return (
            db.query(Patient)
            .filter(
                or_(
                    Patient.patient_code.ilike(search_pattern),
                    Patient.first_name.ilike(search_pattern),
                    Patient.last_name.ilike(search_pattern),
                    Patient.phone.ilike(search_pattern),
                )
            )
            .order_by(
                Patient.last_name.asc(),
                Patient.first_name.asc()
            )
            .limit(20)
            .all()
        )

    @staticmethod
    def create(db: Session, patient: Patient):

        db.add(patient)
        db.commit()
        db.refresh(patient)

        return patient
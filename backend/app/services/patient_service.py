from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.schemas.patient import PatientCreate
from app.repositories.patient_repository import PatientRepository


class PatientService:

    @staticmethod
    def create_patient(db: Session, data: PatientCreate):

        patient = Patient(
            first_name=data.first_name,
            last_name=data.last_name,
            age=data.age,
            gender=data.gender,
        )

        return PatientRepository.create(db, patient)

    @staticmethod
    def get_patients(db: Session):
        return PatientRepository.get_all(db)
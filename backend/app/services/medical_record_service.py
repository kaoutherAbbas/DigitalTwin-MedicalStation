from sqlalchemy.orm import Session

from app.models.medical_record import MedicalRecord
from app.schemas.medical_record import MedicalRecordCreate

from app.repositories.medical_record_repository import (
    MedicalRecordRepository
)

from app.repositories.patient_repository import (
    PatientRepository
)


class MedicalRecordService:

    @staticmethod
    def create_or_update(
        db: Session,
        patient_id: int,
        data: MedicalRecordCreate
    ):

        # Vérifier que le patient existe
        patient = PatientRepository.get_by_id(
            db,
            patient_id
        )

        if not patient:
            raise ValueError(
                "Patient introuvable."
            )

        # Chercher le dossier existant
        record = (
            MedicalRecordRepository.get_by_patient_id(
                db,
                patient_id
            )
        )

        if record:

            record.blood_group = data.blood_group
            record.allergies = data.allergies
            record.medical_history = data.medical_history
            record.surgical_history = data.surgical_history
            record.chronic_conditions = data.chronic_conditions
            record.current_medications = data.current_medications
            record.family_history = data.family_history
            record.notes = data.notes

            return MedicalRecordRepository.update(
                db,
                record
            )

        # Créer le dossier
        record = MedicalRecord(
            patient_id=patient_id,
            blood_group=data.blood_group,
            allergies=data.allergies,
            medical_history=data.medical_history,
            surgical_history=data.surgical_history,
            chronic_conditions=data.chronic_conditions,
            current_medications=data.current_medications,
            family_history=data.family_history,
            notes=data.notes
        )

        return MedicalRecordRepository.create(
            db,
            record
        )

    @staticmethod
    def get_by_patient_id(
        db: Session,
        patient_id: int
    ):

        patient = PatientRepository.get_by_id(
            db,
            patient_id
        )

        if not patient:
            raise ValueError(
                "Patient introuvable."
            )

        return (
            MedicalRecordRepository.get_by_patient_id(
                db,
                patient_id
            )
        )
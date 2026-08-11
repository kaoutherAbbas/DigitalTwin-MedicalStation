from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.schemas.patient import PatientCreate
from app.repositories.patient_repository import PatientRepository


class PatientService:

    @staticmethod
    def create_patient(db: Session, data: PatientCreate):

        # ==========================================
        # 1. Vérification d'un éventuel doublon
        # ==========================================

        first_name = data.first_name.strip()
        last_name = data.last_name.strip()

        existing_patient = (
            db.query(Patient)
            .filter(
                Patient.first_name.ilike(first_name),
                Patient.last_name.ilike(last_name),
                Patient.date_of_birth == data.date_of_birth
            )
            .first()
        )

        if existing_patient:
            raise ValueError(
                f"Ce patient existe déjà avec le numéro de dossier "
                f"{existing_patient.patient_code}"
            )

        # ==========================================
        # 2. Génération du numéro de dossier
        # ==========================================

        last_patient = (
            db.query(Patient)
            .order_by(Patient.id.desc())
            .first()
        )

        if last_patient:
            next_id = last_patient.id + 1
        else:
            next_id = 1

        patient_code = f"PAT-{next_id:06d}"

        # ==========================================
        # 3. Création du patient
        # ==========================================

        patient = Patient(
            patient_code=patient_code,
            first_name=first_name,
            last_name=last_name,
            date_of_birth=data.date_of_birth,
            age=data.age,
            gender=data.gender,
            phone=data.phone.strip() if data.phone else None,
        )

        return PatientRepository.create(db, patient)

    # ==========================================
    # Récupérer tous les patients
    # ==========================================

    @staticmethod
    def get_patients(db: Session):
        return PatientRepository.get_all(db)

    # ==========================================
    # Rechercher un patient
    # ==========================================

    @staticmethod
    def search_patients(db: Session, query: str):
        return PatientRepository.search(db, query)
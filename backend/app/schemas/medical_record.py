from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MedicalRecordCreate(BaseModel):
    blood_group: str | None = None
    allergies: str | None = None
    medical_history: str | None = None
    surgical_history: str | None = None
    chronic_conditions: str | None = None
    current_medications: str | None = None
    family_history: str | None = None
    notes: str | None = None


class MedicalRecordResponse(MedicalRecordCreate):
    id: int
    patient_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
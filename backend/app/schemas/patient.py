from datetime import date

from pydantic import BaseModel, ConfigDict


class PatientBase(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    age: int
    gender: str
    phone: str | None = None


class PatientCreate(PatientBase):
    pass


class PatientUpdate(PatientBase):
    pass


class PatientResponse(PatientBase):
    id: int
    patient_code: str

    model_config = ConfigDict(from_attributes=True)

from pydantic import BaseModel, ConfigDict


class PatientBase(BaseModel):
    first_name: str
    last_name: str
    age: int
    gender: str


class PatientCreate(PatientBase):
    pass


class PatientUpdate(PatientBase):
    pass


class PatientResponse(PatientBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
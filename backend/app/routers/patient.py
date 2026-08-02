from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.patient import (
    PatientCreate,
    PatientResponse,
)

from app.services.patient_service import PatientService

router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
)


@router.post("/", response_model=PatientResponse)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
):
    return PatientService.create_patient(db, patient)


@router.get("/", response_model=list[PatientResponse])
def get_patients(
    db: Session = Depends(get_db),
):
    return PatientService.get_patients(db)

from fastapi import APIRouter, Depends, HTTPException, Query
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


# ==========================================
# CRÉER UN PATIENT
# ==========================================

@router.post("/", response_model=PatientResponse)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
):
    try:
        return PatientService.create_patient(db, patient)

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )


# ==========================================
# RECHERCHER UN PATIENT
# ==========================================

@router.get("/search", response_model=list[PatientResponse])
def search_patients(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
):
    return PatientService.search_patients(db, q)


# ==========================================
# RÉCUPÉRER TOUS LES PATIENTS
# ==========================================

@router.get("/", response_model=list[PatientResponse])
def get_patients(
    db: Session = Depends(get_db),
):
    return PatientService.get_patients(db)

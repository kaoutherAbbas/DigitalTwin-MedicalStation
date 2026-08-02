from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.measurement import (
    MeasurementCreate,
    MeasurementResponse,
)

from app.services.measurement_service import (
    MeasurementService,
)

router = APIRouter(
    prefix="/measurements",
    tags=["Measurements"],
)


@router.post("/", response_model=MeasurementResponse)
def create_measurement(
    measurement: MeasurementCreate,
    db: Session = Depends(get_db),
):
    return MeasurementService.create_measurement(
        db,
        measurement,
    )


@router.get("/", response_model=list[MeasurementResponse])
def get_measurements(
    db: Session = Depends(get_db),
):
    return MeasurementService.get_measurements(db)


@router.get(
    "/patient/{patient_id}",
    response_model=list[MeasurementResponse],
)
def get_patient_measurements(
    patient_id: int,
    db: Session = Depends(get_db),
):
    return MeasurementService.get_patient_measurements(
        db,
        patient_id,
    )
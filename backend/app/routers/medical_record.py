from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.medical_record import (
    MedicalRecordCreate,
    MedicalRecordResponse
)

from app.services.medical_record_service import (
    MedicalRecordService
)


router = APIRouter(
    prefix="/medical-records",
    tags=["Medical Records"]
)


@router.post(
    "/{patient_id}",
    response_model=MedicalRecordResponse
)
def create_or_update_medical_record(
    patient_id: int,
    data: MedicalRecordCreate,
    db: Session = Depends(get_db)
):

    try:

        return MedicalRecordService.create_or_update(
            db,
            patient_id,
            data
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )


@router.get(
    "/patient/{patient_id}",
    response_model=MedicalRecordResponse | None
)
def get_medical_record(
    patient_id: int,
    db: Session = Depends(get_db)
):

    try:

        return MedicalRecordService.get_by_patient_id(
            db,
            patient_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
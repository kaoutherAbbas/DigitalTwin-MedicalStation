from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.twin_service import get_patient_twin

router = APIRouter(
    prefix="/twin",
    tags=["Digital Twin"]
)


@router.get("/{patient_id}")
def get_twin(
    patient_id: int,
    db: Session = Depends(get_db)
):

    twin = get_patient_twin(db, patient_id)

    if twin is None:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return twin
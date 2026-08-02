from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.sensor import SensorCreate, SensorResponse
from app.services.sensor_service import SensorService

router = APIRouter(
    prefix="/sensors",
    tags=["Sensors"],
)


@router.post("/", response_model=SensorResponse)
def create_sensor(
    sensor: SensorCreate,
    db: Session = Depends(get_db),
):
    return SensorService.create_sensor(db, sensor)


@router.get("/", response_model=list[SensorResponse])
def get_sensors(
    db: Session = Depends(get_db),
):
    return SensorService.get_sensors(db)
@router.get("/{sensor_id}", response_model=SensorResponse)
def get_sensor(sensor_id: int, db: Session = Depends(get_db)):
    return SensorService.get_sensor(db, sensor_id)


@router.put("/{sensor_id}", response_model=SensorResponse)
def update_sensor(
    sensor_id: int,
    sensor: SensorCreate,
    db: Session = Depends(get_db),
):
    return SensorService.update_sensor(db, sensor_id, sensor)


@router.delete("/{sensor_id}")
def delete_sensor(sensor_id: int, db: Session = Depends(get_db)):
    return SensorService.delete_sensor(db, sensor_id)
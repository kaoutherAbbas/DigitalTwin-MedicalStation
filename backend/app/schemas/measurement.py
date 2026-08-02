from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MeasurementCreate(BaseModel):
    patient_id: int
    sensor_id: int
    value: float


class MeasurementResponse(BaseModel):
    id: int
    patient_id: int
    sensor_id: int
    value: float
    timestamp: datetime

    model_config = ConfigDict(
        from_attributes=True
    )
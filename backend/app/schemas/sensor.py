from pydantic import BaseModel, ConfigDict


class SensorBase(BaseModel):
    name: str
    unit: str


class SensorCreate(SensorBase):
    pass


class SensorResponse(SensorBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
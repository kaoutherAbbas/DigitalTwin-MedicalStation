from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    Float,
    DateTime,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from app.database import Base


class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(Integer, ForeignKey("patients.id"))
    sensor_id = Column(Integer, ForeignKey("sensors.id"))

    value = Column(Float)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow,
    )

    patient = relationship(
        "Patient",
        back_populates="measurements",
    )

    sensor = relationship(
        "Sensor",
        back_populates="measurements",
    )
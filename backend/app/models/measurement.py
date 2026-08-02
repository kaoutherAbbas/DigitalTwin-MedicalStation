from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(Integer, primary_key=True, index=True)

    value = Column(Float, nullable=False)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    sensor_id = Column(
        Integer,
        ForeignKey("sensors.id")
    )

    patient = relationship(
        "Patient",
        back_populates="measurements"
    )

    sensor = relationship(
        "Sensor",
        back_populates="measurements"
    )
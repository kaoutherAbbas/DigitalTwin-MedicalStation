from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from app.database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    measurement_id = Column(
        Integer,
        ForeignKey("measurements.id")
    )

    level = Column(
        String(20),
        nullable=False
    )

    message = Column(
        String(300),
        nullable=False
    )

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )

    patient = relationship("Patient")

    measurement = relationship("Measurement")
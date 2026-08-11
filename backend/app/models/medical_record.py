from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True
    )

    blood_group = Column(String(10), nullable=True)

    allergies = Column(Text, nullable=True)

    medical_history = Column(Text, nullable=True)

    surgical_history = Column(Text, nullable=True)

    chronic_conditions = Column(Text, nullable=True)

    current_medications = Column(Text, nullable=True)

    family_history = Column(Text, nullable=True)

    notes = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    patient = relationship(
        "Patient",
        back_populates="medical_record"
    )
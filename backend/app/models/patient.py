from sqlalchemy import Column, Integer, String, Date, UniqueConstraint
from sqlalchemy.orm import relationship

from app.database import Base


class Patient(Base):
    __tablename__ = "patients"

    __table_args__ = (
        UniqueConstraint(
            "first_name",
            "last_name",
            "date_of_birth",
            name="uq_patient_identity"
        ),
    )

    id = Column(Integer, primary_key=True, index=True)

    patient_code = Column(
        String(20),
        unique=True,
        nullable=False,
        index=True
    )

    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)

    date_of_birth = Column(Date, nullable=False)

    age = Column(Integer, nullable=False)

    gender = Column(String(20), nullable=False)

    phone = Column(String(30), nullable=True)

    measurements = relationship(
        "Measurement",
        back_populates="patient",
        cascade="all, delete-orphan"
    )
    medical_record = relationship(
    "MedicalRecord",
    back_populates="patient",
    uselist=False,
    cascade="all, delete-orphan"
)
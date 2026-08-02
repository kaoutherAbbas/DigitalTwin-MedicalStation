from sqlalchemy.orm import Session

from app.models.measurement import Measurement
from app.models.sensor import Sensor
from app.models.patient import Patient


def save_measurement(db: Session, payload: dict):

    patient = (
        db.query(Patient)
        .filter(Patient.id == payload["patient_id"])
        .first()
    )

    if patient is None:
        print("Patient introuvable")
        return

    sensor = (
        db.query(Sensor)
        .filter(Sensor.name.ilike(payload["sensor"]))
        .first()
    )

    if sensor is None:
        print("Capteur introuvable")
        return

    measurement = Measurement(
        patient_id=patient.id,
        sensor_id=sensor.id,
        value=payload["value"]
    )

    db.add(measurement)
    db.commit()
    db.refresh(measurement)

    print("Mesure enregistrée :", measurement.id)
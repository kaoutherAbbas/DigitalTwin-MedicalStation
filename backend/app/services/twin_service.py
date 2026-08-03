from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.models.sensor import Sensor
from app.models.measurement import Measurement
from app.models.alert import Alert


def get_patient_twin(db: Session, patient_id: int):

    patient = (
        db.query(Patient)
        .filter(Patient.id == patient_id)
        .first()
    )

    if patient is None:
        return None

    sensors = db.query(Sensor).all()

    latest_measurements = {}

    for sensor in sensors:

        measurement = (
            db.query(Measurement)
            .filter(
                Measurement.patient_id == patient_id,
                Measurement.sensor_id == sensor.id
            )
            .order_by(Measurement.timestamp.desc())
            .first()
        )

        latest_measurements[sensor.name] = (
            measurement.value if measurement else None
        )

    alerts = (
        db.query(Alert)
        .filter(Alert.patient_id == patient_id)
        .order_by(Alert.timestamp.desc())
        .all()
    )

    return {
        "patient": patient,
        "latest_measurements": latest_measurements,
        "alerts": alerts
    }
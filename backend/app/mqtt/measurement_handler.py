from app.websocket.queue import message_queue
from app.websocket.events import send_websocket_message
from sqlalchemy.orm import Session

from app.models.measurement import Measurement
from app.models.sensor import Sensor
from app.models.patient import Patient
from app.services.alert_service import check_alert

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
    check_alert(db, measurement)

    message = {
      "patient_id": patient.id,
      "sensor": sensor.name,
      "value": measurement.value,
      "timestamp": str(measurement.timestamp)
}

    try:
        message_queue.put_nowait(message)

    except Exception as e:
        print("Erreur queue websocket :", e)

    print("Mesure enregistrée :", measurement.id)
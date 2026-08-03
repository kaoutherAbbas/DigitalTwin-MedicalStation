from app.models.alert import Alert

TEMPERATURE_HIGH = 38.0
TEMPERATURE_LOW = 35.0

HEART_RATE_HIGH = 100
HEART_RATE_LOW = 50

SPO2_LOW = 92

BLOOD_PRESSURE_HIGH = 140


def check_alert(db, measurement):

    sensor = measurement.sensor.name
    value = measurement.value

    alert = None

    if sensor == "Temperature":

        if value > TEMPERATURE_HIGH:
            alert = Alert(
                patient_id=measurement.patient_id,
                measurement_id=measurement.id,
                level="HIGH",
                message=f"Fever detected ({value} °C)"
            )

        elif value < TEMPERATURE_LOW:
            alert = Alert(
                patient_id=measurement.patient_id,
                measurement_id=measurement.id,
                level="HIGH",
                message=f"Hypothermia detected ({value} °C)"
            )

    elif sensor == "Heart Rate":

        if value > HEART_RATE_HIGH:
            alert = Alert(
                patient_id=measurement.patient_id,
                measurement_id=measurement.id,
                level="HIGH",
                message=f"Tachycardia ({value} bpm)"
            )

        elif value < HEART_RATE_LOW:
            alert = Alert(
                patient_id=measurement.patient_id,
                measurement_id=measurement.id,
                level="HIGH",
                message=f"Bradycardia ({value} bpm)"
            )

    elif sensor == "SpO2":

        if value < SPO2_LOW:
            alert = Alert(
                patient_id=measurement.patient_id,
                measurement_id=measurement.id,
                level="CRITICAL",
                message=f"Low Oxygen ({value}%)"
            )

    elif sensor == "Blood Pressure":

        if value > BLOOD_PRESSURE_HIGH:
            alert = Alert(
                patient_id=measurement.patient_id,
                measurement_id=measurement.id,
                level="HIGH",
                message=f"Hypertension ({value} mmHg)"
            )

    if alert:
        db.add(alert)
        db.commit()

        print("ALERTE :", alert.message)
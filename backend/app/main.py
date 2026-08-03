from fastapi import FastAPI
from app.config import settings
from app.database import Base, engine
from app.routers.patient import router as patient_router
from app.routers.sensor import router as sensor_router
from app.routers.measurement import (router as measurement_router,)
from app.routers.alerts import router as alert_router
from app.routers.twin import router as twin_router
# Import des modèles
from app.models import Patient, Sensor, Measurement, Alert

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Digital Twin Medical Station"
)
app.include_router(patient_router)
app.include_router(sensor_router)
app.include_router(measurement_router)
app.include_router(alert_router)
app.include_router(twin_router)
@app.get("/")
async def root():
    return {
        "project": settings.PROJECT_NAME,
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }
import asyncio

from app.websocket.worker import websocket_worker
from app.websocket.events import set_loop
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine

from app.models import Patient, Sensor, Measurement, Alert

from app.routers.patient import router as patient_router
from app.routers.sensor import router as sensor_router
from app.routers.measurement import router as measurement_router
from app.routers.alerts import router as alert_router
from app.routers.twin import router as twin_router

from app.websocket.routes import router as websocket_router
from app.mqtt.mqtt_service import start_mqtt


Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):

    print("🚀 Démarrage de FastAPI...")


    set_loop(asyncio.get_running_loop())


    start_mqtt()
    asyncio.create_task(websocket_worker())

    yield


    print("🛑 Arrêt de FastAPI...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Digital Twin Medical Station",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patient_router)
app.include_router(sensor_router)
app.include_router(measurement_router)
app.include_router(alert_router)
app.include_router(websocket_router)
app.include_router(twin_router)


@app.get("/")
async def root():
    return {
        "project": settings.PROJECT_NAME,
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
    }
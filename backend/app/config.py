from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "DigitalTwinMedicalStation"

    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000

    DATABASE_URL: str = "sqlite:///./medical_station.db"

    MQTT_HOST: str = "localhost"
    MQTT_PORT: int = 1883

    SECRET_KEY: str = "CHANGE_ME"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"


settings = Settings()
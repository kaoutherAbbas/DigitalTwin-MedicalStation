# DigitalTwin-MedicalStation

## Description

DigitalTwin-MedicalStation est une station médicale intelligente permettant de simuler des capteurs biomédicaux, d'envoyer les données via MQTT, de les stocker dans PostgreSQL et de construire un jumeau numérique en temps réel.

---

## Technologies

- Python 3.12
- FastAPI
- PostgreSQL
- SQLAlchemy
- MQTT (Mosquitto)
- Docker
- React
- WebSocket

---

## Fonctionnalités

- Simulation ECG
- Simulation SpO₂
- Température
- Pression artérielle
- Fréquence cardiaque
- Dashboard React
- API REST
- MQTT
- Digital Twin
- Alertes médicales

---

## Architecture

Simulator

↓

MQTT Broker

↓

FastAPI

↓

PostgreSQL

↓

Digital Twin

↓

React Dashboard
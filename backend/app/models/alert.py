from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    level = Column(String(20), nullable=False)

    message = Column(String(300), nullable=False)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )
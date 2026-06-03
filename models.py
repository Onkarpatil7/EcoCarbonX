from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, nullable=False)
    industry = Column(String)
    location = Column(String)
    total_emission = Column(Float, default=0)
    green_score = Column(Float, default=0)
    carbon_tokens = Column(Float, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    emissions = relationship("Emission", back_populates="company")
    predictions = relationship("Prediction", back_populates="company")
    marketplace = relationship("Marketplace", back_populates="company")



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


class Emission(Base):
    __tablename__ = "emissions"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    month = Column(String)
    emission_value = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="emissions")


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    predicted_month = Column(String)
    predicted_emission = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="predictions")


class Marketplace(Base):
    __tablename__ = "marketplace"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    token_amount = Column(Float)
    price = Column(Float)
    status = Column(String, default="available")
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("Company", back_populates="marketplace")


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String)
    report_type = Column(String)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
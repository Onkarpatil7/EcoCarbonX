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



class CompanyProfile(Base):

    __tablename__ = "company_profiles"

    id = Column(Integer,primary_key=True,index=True)
    company_name = Column(String,nullable=False)
    industry = Column(String,nullable=False)
    location = Column(String,nullable=False)
    email = Column(String,unique=True,nullable=False)


class Marketplace(Base):

    __tablename__ = "marketplace"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, nullable=False)
    industry = Column(String, nullable=False)
    credits = Column(Integer, default=100)
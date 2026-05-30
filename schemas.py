from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    email: str
    password: str
    role: str


class LoginSchema(BaseModel):
    email: str
    password: str


class CompanyCreate(BaseModel):
    company_name: str
    industry: Optional[str] = None
    location: Optional[str] = None


class EmissionCreate(BaseModel):
    company_id: int
    month: str
    emission_value: float


class PredictionCreate(BaseModel):
    company_id: int
    predicted_month: str
    predicted_emission: float


class MarketplaceCreate(BaseModel):
    company_id: int
    token_amount: float
    price: float


class ReportCreate(BaseModel):
    company_name: str
    report_type: str
    description: str
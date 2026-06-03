from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    email: str
    password: str
    role: str


class LoginSchema(BaseModel):
    email: str
    password: str

class CompanyProfileCreate(BaseModel):
    company_name: str
    industry: str
    location: str
    email: str

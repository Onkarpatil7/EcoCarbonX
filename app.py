from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, sessionLocal, Base, get_db

from models import Base, User, CompanyProfile
from schemas import (
    UserCreate,
    LoginSchema,
    CompanyProfileCreate
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Carbonex API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def home():
    return {
        "message": "Carbonex FastAPI Backend Running"
    }

# ==========================
# AUTH APIs
# ==========================

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        email=user.email,
        password=user.password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Registration successful",
        "user_id": new_user.id
    }


@app.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.password != data.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "message": "Login successful",
        "role": user.role,
        "user_id": user.id
    }

@app.post("/company/profile")
def create_company_profile(
    profile: CompanyProfileCreate,
    db: Session = Depends(get_db)
):

    existing_profile = db.query(
        CompanyProfile
    ).filter(
        CompanyProfile.email == profile.email
    ).first()

    # UPDATE EXISTING PROFILE

    if existing_profile:

        existing_profile.company_name = (
            profile.company_name
        )

        existing_profile.industry = (
            profile.industry
        )

        existing_profile.location = (
            profile.location
        )

        db.commit()

        return {
            "message":
            "Profile Updated Successfully"
        }

    # CREATE NEW PROFILE

    new_profile = CompanyProfile(

        company_name = profile.company_name,

        industry = profile.industry,

        location = profile.location,

        email = profile.email

    )

    db.add(new_profile)

    db.commit()

    db.refresh(new_profile)

    return {
        "message":
        "Profile Created Successfully"
    }

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
from models import Base, User, Company, Emission, Prediction, Marketplace, Report
from schemas import (
    UserCreate,
    LoginSchema,
    CompanyCreate,
    EmissionCreate,
    PredictionCreate,
    MarketplaceCreate,
    ReportCreate
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

# ==========================
# COMPANY APIs
# ==========================

@app.post("/companies")
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):

    new_company = Company(
        company_name=company.company_name,
        industry=company.industry,
        location=company.location
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return {
        "message": "Company created",
        "data": {
            "id": new_company.id,
            "company_name": new_company.company_name
        }
    }


@app.get("/companies")
def get_companies(db: Session = Depends(get_db)):

    companies = db.query(Company).all()

    return companies


# ==========================
# EMISSION APIs
# ==========================

@app.post("/emissions")
def add_emission(data: EmissionCreate, db: Session = Depends(get_db)):

    emission = Emission(
        company_id=data.company_id,
        month=data.month,
        emission_value=data.emission_value
    )

    db.add(emission)
    db.commit()
    db.refresh(emission)

    return {
        "message": "Emission data added",
        "emission_id": emission.id
    }

@app.get("/emissions")
def get_emissions(db: Session = Depends(get_db)):

    emissions = db.query(Emission).all()

    return emissions


# ==========================
# PREDICTION APIs
# ==========================

@app.post("/predictions")
def add_prediction(data: PredictionCreate, db: Session = Depends(get_db)):

    prediction = Prediction(
        company_id=data.company_id,
        predicted_month=data.predicted_month,
        predicted_emission=data.predicted_emission
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return {
        "message": "Prediction added",
        "prediction_id": prediction.id
    }


@app.get("/predictions")
def get_predictions(db: Session = Depends(get_db)):

    predictions = db.query(Prediction).all()

    return predictions


# ==========================
# MARKETPLACE APIs
# ==========================

@app.post("/marketplace")
def create_marketplace(data: MarketplaceCreate, db: Session = Depends(get_db)):

    marketplace = Marketplace(
        company_id=data.company_id,
        token_amount=data.token_amount,
        price=data.price
    )

    db.add(marketplace)
    db.commit()
    db.refresh(marketplace)

    return {
        "message": "Marketplace token listed",
        "marketplace_id": marketplace.id
    }
@app.get("/marketplace")
def get_marketplace(db: Session = Depends(get_db)):

    marketplace = db.query(Marketplace).all()

    return marketplace


# ==========================
# REPORT APIs
# ==========================

@app.post("/reports")
def create_report(data: ReportCreate, db: Session = Depends(get_db)):

    report = Report(
        company_name=data.company_name,
        report_type=data.report_type,
        description=data.description
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return {
        "message": "Report created",
        "report_id": report.id
    }


@app.get("/reports")
def get_reports(db: Session = Depends(get_db)):

    reports = db.query(Report).all()

    return reports
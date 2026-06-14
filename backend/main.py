from fastapi import FastAPI

from app.database.database import engine
from app.models.models import Base

from app.api.calendar import router as calendar_router

app = FastAPI(
    title="HRlytics AI",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(calendar_router)

@app.get("/")
def root():
    return {"message": "Welcome to HRlytics AI"}

@app.get("/health")
def health():
    return {"status": "healthy"}
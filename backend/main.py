from fastapi import FastAPI

from app.database.database import engine
from app.models.models import Base

from app.api.calendar import router as calendar_router
from app.api.meetings import router as meetings_router

app = FastAPI(
    title="HRlytics AI",
    version="1.0.0"
)

from app.models.models import (
    MeetingAttribution,
    CostAllocation
)

Base.metadata.create_all(bind=engine)

app.include_router(calendar_router)

app.include_router(meetings_router)

@app.get("/")
def root():
    return {"message": "Welcome to HRlytics AI"}

@app.get("/health")
def health():
    return {"status": "healthy"}

from app.api.meetings import (
    router as meetings_router
)
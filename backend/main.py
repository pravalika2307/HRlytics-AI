from fastapi import FastAPI

from app.database.database import engine
from app.models.models import Base

from app.api.calendar import router as calendar_router
from app.api.meetings import router as meetings_router
from app.api.analytics import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.insights import router as insights_router
from app.api.dashboard import router as dashboard_router
from app.api.advisor import router as advisor_router

app = FastAPI(
    title="HRlytics AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.models.models import (
    MeetingAttribution,
    CostAllocation
)

Base.metadata.create_all(bind=engine)

app.include_router(calendar_router)
app.include_router(meetings_router)
app.include_router(analytics_router)
app.include_router(insights_router)
app.include_router(dashboard_router)
app.include_router(advisor_router)


@app.get("/")
def root():
    return {"message": "Welcome to HRlytics AI"}

@app.get("/health")
def health():
    return {"status": "healthy"}

from app.api.meetings import (
    router as meetings_router
)

from app.api.analytics import (
    router as analytics_router
)
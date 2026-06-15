from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.models.models import Meeting

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/total-cost")
def total_cost(
    db: Session = Depends(get_db)
):

    meetings = db.query(Meeting).all()

    total = sum(
        meeting.cost
        for meeting in meetings
    )

    return {
        "total_hr_cost": total
    }


@router.get("/meeting-count")
def meeting_count(
    db: Session = Depends(get_db)
):

    meetings = db.query(Meeting).all()

    return {
        "meeting_count": len(meetings)
    }
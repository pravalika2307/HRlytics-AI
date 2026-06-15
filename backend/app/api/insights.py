from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Meeting

router = APIRouter(
    prefix="/insights",
    tags=["Insights"]
)


@router.get("/")
def get_insights(
    db: Session = Depends(get_db)
):
    meetings = db.query(Meeting).all()

    if not meetings:
        return {
            "average_cost": 0,
            "highest_cost": 0,
            "highest_meeting": "No Meetings"
        }

    total_cost = sum(
        meeting.cost
        for meeting in meetings
    )

    average_cost = round(
        total_cost / len(meetings),
        2
    )

    highest_meeting = max(
        meetings,
        key=lambda x: x.cost
    )

    return {
        "average_cost": average_cost,
        "highest_cost": highest_meeting.cost,
        "highest_meeting": highest_meeting.title
    }
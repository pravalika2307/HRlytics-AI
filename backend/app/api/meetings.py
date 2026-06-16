from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.meeting_schema import MeetingCreate

from app.services.cost_service import calculate_meeting_cost

from app.database.session import get_db

from app.database.crud import create_meeting

from app.ai.attribution_engine import attribute_project

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"]
)


@router.post("/cost")
def calculate_cost(
    meeting: MeetingCreate,
    db: Session = Depends(get_db)
):

    cost = calculate_meeting_cost(
        duration_hours=meeting.duration_hours,
        attendees_count=meeting.attendees_count
    )

    attribution = attribute_project(
    meeting.title,
    meeting.description,
    []
)

    saved_meeting = create_meeting(
    db=db,
    title=meeting.title,
    description=meeting.description,
    duration=meeting.duration_hours,
    attendees_count=meeting.attendees_count,
    cost=cost,
    project_name=attribution["project"],
    confidence=attribution["confidence"]
)

    return {
        "id": saved_meeting.id,
        "meeting_title": saved_meeting.title,
        "meeting_cost": saved_meeting.cost
    }

from app.models.models import Meeting


@router.get("/")
def get_all_meetings(
    db: Session = Depends(get_db)
):

    meetings = db.query(Meeting).all()

    return meetings
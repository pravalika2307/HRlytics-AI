from fastapi import APIRouter

from app.schemas.meeting_schema import (
    MeetingCreate
)

from app.services.cost_service import (
    calculate_meeting_cost
)

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"]
)


@router.post("/cost")
def calculate_cost(
    meeting: MeetingCreate
):

    cost = calculate_meeting_cost(
        duration_hours=meeting.duration_hours,
        attendees_count=meeting.attendees_count
    )

    return {
        "meeting_title": meeting.title,
        "meeting_cost": cost
    }
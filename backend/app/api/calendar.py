from fastapi import APIRouter

from app.schemas.calendar_schema import (
    MeetingRequest
)

from app.ai.attribution_engine import (
    attribute_project
)

router = APIRouter(
    prefix="/calendar",
    tags=["Calendar"]
)


@router.post("/attribute")
def attribute_meeting(
    meeting: MeetingRequest
):

    result = attribute_project(
        title=meeting.title,
        description=meeting.description,
        attendees=meeting.attendees
    )

    return result
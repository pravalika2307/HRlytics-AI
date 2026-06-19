from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.meeting_schema import MeetingCreate
from app.services.cost_service import calculate_meeting_cost
from app.database.session import get_db
from app.database.crud import create_meeting
from app.ai.attribution_engine import attribute_project
from app.models.models import Meeting

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"]
)


# CREATE MEETING
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


# GET ALL MEETINGS
@router.get("/")
def get_all_meetings(
    db: Session = Depends(get_db)
):
    meetings = db.query(Meeting).all()
    return meetings


# GET SINGLE MEETING
@router.get("/{meeting_id}")
def get_meeting(
    meeting_id: int,
    db: Session = Depends(get_db)
):
    meeting = (
        db.query(Meeting)
        .filter(Meeting.id == meeting_id)
        .first()
    )

    if not meeting:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return meeting


# DELETE MEETING
@router.delete("/{meeting_id}")
def delete_meeting(
    meeting_id: int,
    db: Session = Depends(get_db)
):
    meeting = (
        db.query(Meeting)
        .filter(Meeting.id == meeting_id)
        .first()
    )

    if not meeting:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    db.delete(meeting)
    db.commit()

    return {
        "message": "Meeting deleted successfully",
        "deleted_meeting_id": meeting_id
    }
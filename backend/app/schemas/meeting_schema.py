from pydantic import BaseModel


class MeetingCreate(BaseModel):
    title: str
    description: str
    duration_hours: float
    attendees_count: int


class MeetingResponse(MeetingCreate):
    meeting_cost: float
from pydantic import BaseModel


class MeetingRequest(BaseModel):

    title: str

    description: str = ""

    attendees: list = []
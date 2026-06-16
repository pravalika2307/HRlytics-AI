from app.models.models import Meeting


def create_meeting(
    db,
    title,
    description,
    duration,
    attendees_count,
    cost,
    project_name,
    confidence
):
    meeting = Meeting(
    title=title,
    duration=duration,
    cost=cost,
    project_name=project_name,
    confidence=confidence
)

    db.add(meeting)

    db.commit()

    db.refresh(meeting)

    return meeting
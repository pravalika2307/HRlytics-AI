from app.models.models import Meeting


def create_meeting(
    db,
    title,
    description,
    duration,
    attendees_count,
    cost
):

    meeting = Meeting(
        title=title,
        description=description,
        duration=duration,
        attendees_count=attendees_count,
        cost=cost,
        confidence=0
    )

    db.add(meeting)

    db.commit()

    db.refresh(meeting)

    return meeting
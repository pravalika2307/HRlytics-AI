from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Meeting

router = APIRouter(
    prefix="/advisor",
    tags=["Advisor"]
)


@router.get("/")
def workforce_advisor(
    db: Session = Depends(get_db)
):
    meetings = db.query(Meeting).all()

    if not meetings:
        return {
            "insights": [
                "No meeting data available"
            ]
        }

    total_cost = sum(
        meeting.cost
        for meeting in meetings
    )

    avg_cost = round(
        total_cost / len(meetings),
        2
    )

    highest = max(
        meetings,
        key=lambda x: x.cost
    )

    insights = [
        f"Highest cost meeting: {highest.title}",
        f"Average meeting cost: ₹{avg_cost}",
        f"Total workforce spend: ₹{total_cost}"
    ]

    if avg_cost > 5000:
        insights.append(
            "Meeting costs are trending high"
        )
    else:
        insights.append(
            "Meeting costs remain healthy"
        )

    return {
        "insights": insights
    }
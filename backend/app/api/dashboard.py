from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.models import Meeting

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):
    meetings = db.query(Meeting).all()

    chart_data = []

    for meeting in meetings:
        chart_data.append({
            "name": meeting.title,
            "cost": meeting.cost
        })

    return chart_data
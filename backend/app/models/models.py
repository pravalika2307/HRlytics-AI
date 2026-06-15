from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import ForeignKey

from app.database.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    email = Column(String)

    role = Column(String)

    hourly_cost = Column(Float)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    budget = Column(Float)

    priority = Column(String)


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    duration = Column(Float)

    project_id = Column(Integer, ForeignKey("projects.id"))

    cost = Column(Float)

    confidence = Column(Float)
    #models of the app

class MeetingAttribution(Base):
    __tablename__ = "meeting_attributions"

    id = Column(Integer, primary_key=True, index=True)

    meeting_id = Column(Integer)

    project_name = Column(String)

    confidence = Column(Float)

    reason = Column(String)


class CostAllocation(Base):
    __tablename__ = "cost_allocations"

    id = Column(Integer, primary_key=True, index=True)

    project_name = Column(String)

    allocated_cost = Column(Float)

    month = Column(String)
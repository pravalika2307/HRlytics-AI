from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True)
    name = Column(String)
    email = Column(String, unique=True)
    hourly_rate = Column(Float)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, unique=True)
    description = Column(String)


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    duration_hours = Column(Float)
    meeting_cost = Column(Float)


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
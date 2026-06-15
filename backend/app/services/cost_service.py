def calculate_meeting_cost(
    duration_hours: float,
    attendees_count: int,
    hourly_rate: float = 1000
):
    return duration_hours * attendees_count * hourly_rate
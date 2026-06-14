from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build


def get_calendar_events(credentials_dict):

    creds = Credentials(
        token=credentials_dict["token"]
    )

    service = build(
        "calendar",
        "v3",
        credentials=creds
    )

    events_result = service.events().list(
        calendarId="primary",
        maxResults=50,
        singleEvents=True,
        orderBy="startTime"
    ).execute()

    events = events_result.get(
        "items",
        []
    )

    return events
import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-1.5-flash")


def attribute_project(
    title: str,
    description: str,
    attendees: list
):
    prompt = f"""
    You are an HR analytics assistant.

    Identify the project/workstream for this meeting.

    Meeting Title:
    {title}

    Description:
    {description}

    Attendees:
    {attendees}

    Return JSON only.

    Format:

    {{
      "project_name":"...",
      "confidence":90,
      "reason":"..."
    }}
    """

    try:
        response = model.generate_content(prompt)

        text = response.text.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")

        return json.loads(text)

    except Exception as e:
        return {
            "project_name": "Unknown",
            "confidence": 0,
            "reason": str(e)
        }
def attribute_project(
    title,
    description,
    attendees
):
    text = (
        title.lower()
        + " "
        + description.lower()
    )

    if "payroll" in text:
        return {
            "project": "HR Transformation",
            "confidence": 94
        }

    if "recruitment" in text:
        return {
            "project": "Talent Acquisition",
            "confidence": 92
        }

    if "budget" in text:
        return {
            "project": "Financial Planning",
            "confidence": 95
        }

    return {
        "project": "General Operations",
        "confidence": 75
    }
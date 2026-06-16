import { useEffect, useState } from "react";
import api from "../services/api";

function Meetings() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    api.get("/meetings/").then((res) => {
      setMeetings(res.data);
    });
  }, []);

  return (
    <div
      style={{
        marginLeft: "280px",
        padding: "30px",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Meetings History
      </h1>

      <div
        style={{
          background: "#111827",
          borderRadius: "20px",
          padding: "20px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom: "1px solid #374151",
                }}
              >
                Title
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom: "1px solid #374151",
                }}
              >
                Project
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom: "1px solid #374151",
                }}
              >
                Confidence
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom: "1px solid #374151",
                }}
              >
                Duration (Hours)
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom: "1px solid #374151",
                }}
              >
                Cost
              </th>
            </tr>
          </thead>

          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id}>
                <td
                  style={{
                    padding: "15px",
                    borderBottom: "1px solid #1f2937",
                  }}
                >
                  {meeting.title}
                </td>

                <td
                  style={{
                    padding: "15px",
                    borderBottom: "1px solid #1f2937",
                    color: "#60a5fa",
                  }}
                >
                  {meeting.project_name || "General Operations"}
                </td>

                <td
                  style={{
                    padding: "15px",
                    borderBottom: "1px solid #1f2937",
                  }}
                >
                  {meeting.confidence
                    ? `${meeting.confidence}%`
                    : "N/A"}
                </td>

                <td
                  style={{
                    padding: "15px",
                    borderBottom: "1px solid #1f2937",
                  }}
                >
                  {meeting.duration}
                </td>

                <td
                  style={{
                    padding: "15px",
                    borderBottom: "1px solid #1f2937",
                    color: "#22c55e",
                    fontWeight: "bold",
                  }}
                >
                  ₹{meeting.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Meetings;
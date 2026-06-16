import { useEffect, useState } from "react";
import api from "../services/api";
import { saveAs } from "file-saver";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get("/meetings/")
      .then((res) => {
        setMeetings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching meetings:", err);
      });
  }, []);

  const exportCSV = () => {
    const csvContent =
      "Title,Duration,Cost\n" +
      meetings
        .map(
          (meeting) =>
            `${meeting.title},${meeting.duration},${meeting.cost}`
        )
        .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "meetings.csv");
  };

  const filteredMeetings = meetings.filter((meeting) =>
    meeting.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        marginLeft: "320px",
        padding: "30px",
        color: "white",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
          fontSize: "36px",
        }}
      >
        Meetings History
      </h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search meetings..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "15px",
          }}
        />

        <button
          onClick={exportCSV}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Export CSV
        </button>
      </div>

      <div
        style={{
          background: "#111827",
          borderRadius: "15px",
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
            <tr
              style={{
                borderBottom: "1px solid #374151",
              }}
            >
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Title
              </th>

              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Duration (mins)
              </th>

              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                Cost (₹)
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map((meeting) => (
                <tr
                  key={meeting.id}
                  style={{
                    borderBottom:
                      "1px solid #1f2937",
                  }}
                >
                  <td
                    style={{
                      padding: "15px",
                    }}
                  >
                    {meeting.title}
                  </td>

                  <td
                    style={{
                      padding: "15px",
                    }}
                  >
                    {meeting.duration}
                  </td>

                  <td
                    style={{
                      padding: "15px",
                      color: "#60a5fa",
                      fontWeight: "600",
                    }}
                  >
                    ₹{meeting.cost}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    padding: "25px",
                    textAlign: "center",
                    color: "#9ca3af",
                  }}
                >
                  No meetings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Meetings;
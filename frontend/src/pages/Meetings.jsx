import { useEffect, useState } from "react";
import api from "../services/api";
import { saveAs } from "file-saver";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    api.get("/meetings/").then((res) => {
      setMeetings(res.data);
    });
  }, []);

  const exportCSV = () => {
    const headers =
      "Title,Project,Confidence,Duration,Cost\n";

    const rows = meetings
      .map(
        (m) =>
          `${m.title},${m.project_name},${m.confidence},${m.duration},${m.cost}`
      )
      .join("\n");

    const blob = new Blob(
      [headers + rows],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    saveAs(blob, "meetings.csv");
  };

  const filteredMeetings = meetings.filter(
    (meeting) => {
      const matchesSearch =
        meeting.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      if (filterType === "high") {
        return (
          matchesSearch &&
          meeting.cost > 5000
        );
      }

      if (filterType === "low") {
        return (
          matchesSearch &&
          meeting.cost <= 5000
        );
      }

      return matchesSearch;
    }
  );

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
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          alignItems: "center",
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
            padding: "10px",
            borderRadius: "10px",
            border:
              "1px solid #374151",
            width: "300px",
          }}
        />

        <select
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <option value="all">
            All Meetings
          </option>

          <option value="high">
            High Cost
          </option>

          <option value="low">
            Low Cost
          </option>
        </select>

        <button
          onClick={exportCSV}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Export CSV
        </button>
      </div>

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
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom:
                    "1px solid #374151",
                }}
              >
                Title
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom:
                    "1px solid #374151",
                }}
              >
                Project
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom:
                    "1px solid #374151",
                }}
              >
                Confidence
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom:
                    "1px solid #374151",
                }}
              >
                Duration
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: "15px",
                  borderBottom:
                    "1px solid #374151",
                }}
              >
                Cost
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredMeetings.map(
              (meeting) => (
                <tr
                  key={meeting.id}
                >
                  <td
                    style={{
                      padding:
                        "15px",
                      borderBottom:
                        "1px solid #1f2937",
                    }}
                  >
                    {meeting.title}
                  </td>

                  <td
                    style={{
                      padding:
                        "15px",
                      borderBottom:
                        "1px solid #1f2937",
                      color:
                        "#60a5fa",
                    }}
                  >
                    {meeting.project_name ||
                      "General Operations"}
                  </td>

                  <td
                    style={{
                      padding:
                        "15px",
                      borderBottom:
                        "1px solid #1f2937",
                    }}
                  >
                    {meeting.confidence
                      ? `${meeting.confidence}%`
                      : "N/A"}
                  </td>

                  <td
                    style={{
                      padding:
                        "15px",
                      borderBottom:
                        "1px solid #1f2937",
                    }}
                  >
                    {meeting.duration}
                  </td>

                  <td
                    style={{
                      padding:
                        "15px",
                      borderBottom:
                        "1px solid #1f2937",
                      color:
                        "#22c55e",
                      fontWeight:
                        "bold",
                    }}
                  >
                    ₹{meeting.cost}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Meetings;
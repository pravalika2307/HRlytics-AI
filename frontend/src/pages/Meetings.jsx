import { useEffect, useState } from "react";
import api from "../services/api";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/meetings/")
      .then((res) => {
        setMeetings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching meetings:", err);
      });
  }, []);

  const exportCSV = () => {
    const csvContent =
      "Title,Duration,Cost,Project\n" +
      meetings
        .map(
          (meeting) =>
            `${meeting.title},${meeting.duration},${meeting.cost},${meeting.project_name || "N/A"}`
        )
        .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "meetings.csv");

    toast.success("CSV exported successfully!");
  };

  const filteredMeetings = meetings.filter((meeting) =>
    meeting.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginLeft: "280px",
        padding: "30px",
        color: "white",
        minHeight: "100vh",
        background: "#0f172a",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "25px",
          fontWeight: "700",
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
            width: "320px",
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
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
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
                  padding: "15px",
                  textAlign: "left",
                  color: "#94a3b8",
                }}
              >
                Title
              </th>

              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  color: "#94a3b8",
                }}
              >
                Duration (hrs)
              </th>

              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  color: "#94a3b8",
                }}
              >
                Cost (₹)
              </th>

              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  color: "#94a3b8",
                }}
              >
                Project
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map((meeting) => (
                <tr
                  key={meeting.id}
                  style={{
                    borderBottom: "1px solid #1f2937",
                    transition: "0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "#1f2937";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "transparent";
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

                  <td
                    style={{
                      padding: "15px",
                    }}
                  >
                    {meeting.project_name || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
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
    </motion.div>
  );
}

export default Meetings;
import { useEffect, useState } from "react";
import api from "../services/api";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Meetings() {
const [meetings, setMeetings] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [durationHours, setDurationHours] = useState("");
const [attendeesCount, setAttendeesCount] = useState("");

const fetchMeetings = () => {
api
.get("/meetings/")
.then((res) => {
setMeetings(res.data);
})
.catch((err) => {
console.error("Error fetching meetings:", err);
});
};

useEffect(() => {
fetchMeetings();
}, []);

const addMeeting = async () => {
if (!title || !durationHours) {
toast.error("Title and Duration are required");
return;
}

```
try {
  await api.post("/meetings/cost", {
    title,
    description,
    duration_hours: Number(durationHours),
    attendees_count: Number(attendeesCount),
  });

  toast.success("Meeting added successfully!");

  setTitle("");
  setDescription("");
  setDurationHours("");
  setAttendeesCount("");

  fetchMeetings();
} catch (error) {
  console.error(error);
  toast.error("Failed to add meeting");
}
```

};

const exportCSV = () => {
const csvContent =
"Title,Duration,Cost,Project\n" +
meetings
.map(
(meeting) =>
`${meeting.title},${meeting.duration},${meeting.cost},${meeting.project_name || "N/A"}`
)
.join("\n");

```
const blob = new Blob([csvContent], {
  type: "text/csv;charset=utf-8;",
});

saveAs(blob, "meetings.csv");
toast.success("CSV exported successfully!");
```

};

const deleteMeeting = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this meeting?"
  );

  if (!confirmed) return;

  try {
    await api.delete(`/meetings/${id}`);

    setMeetings(
      meetings.filter(
        (meeting) => meeting.id !== id
      )
    );

    toast.success("Meeting deleted successfully");
  } catch (error) {
    toast.error("Failed to delete meeting");
    console.error(error);
  }
};

const filteredMeetings = meetings.filter((meeting) =>
meeting.title
?.toLowerCase()
.includes(searchTerm.toLowerCase())
);

console.log(filteredMeetings);
console.log("Filtered Meetings:", filteredMeetings);

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
Meetings History </h1>

  <div
    style={{
      background: "#111827",
      padding: "25px",
      borderRadius: "20px",
      marginBottom: "25px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    }}
  >
    <h2
      style={{
        marginBottom: "20px",
      }}
    >
      Add New Meeting
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "15px",
      }}
    >
      <input
        placeholder="Meeting Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "none",
        }}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "none",
        }}
      />

      <input
        type="number"
        placeholder="Duration Hours"
        value={durationHours}
        onChange={(e) =>
          setDurationHours(e.target.value)
        }
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "none",
        }}
      />

      <input
        type="number"
        placeholder="Attendees Count"
        value={attendeesCount}
        onChange={(e) =>
          setAttendeesCount(e.target.value)
        }
        style={{
          padding: "12px",
          borderRadius: "10px",
          border: "none",
        }}
      />
    </div>

    <button
      onClick={addMeeting}
      style={{
        marginTop: "20px",
        padding: "12px 22px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      Add Meeting
    </button>
  </div>

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
          <th style={{ padding: "15px", textAlign: "left", color: "#94a3b8" }}>
            Title
          </th>

          <th style={{ padding: "15px", textAlign: "left", color: "#94a3b8" }}>
            Duration
          </th>

          <th style={{ padding: "15px", textAlign: "left", color: "#94a3b8" }}>
            Cost
          </th>

          <th style={{ padding: "15px", textAlign: "left", color: "#94a3b8" }}>
            Project
          </th>

          <th
  style={{
    padding: "15px",
    textAlign: "left",
    color: "#94a3b8",
  }}
>
  Actions
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
        }}
      >
            <td style={{ padding: "15px" }}>
              {meeting.title}
            </td>

            <td style={{ padding: "15px" }}>
              {meeting.duration}
            </td>

            <td style={{ padding: "15px" }}>
              <span
                style={{
                  background:
                    meeting.cost > 5000
                      ? "#dc2626"
                      : "#16a34a",
                  padding: "6px 12px",
                  borderRadius: "20px",
                }}
              >
                ₹{meeting.cost}
              </span>
            </td>

            <td style={{ padding: "15px" }}>
              {meeting.project_name}
            </td>

            <td style={{ padding: "15px" }}>
  <button
    onClick={() =>
      deleteMeeting(meeting.id)
    }
    style={{
      background: "#dc2626",
      border: "none",
      color: "white",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Delete
  </button>
</td>

          </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="5"
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

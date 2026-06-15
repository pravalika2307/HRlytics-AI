import { useEffect, useState } from "react";
import api from "../services/api";

function Meetings() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    api
      .get("/meetings/")
      .then((res) => {
        setMeetings(res.data);
      });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Meetings History</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: "20px",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.title}</td>
              <td>{meeting.duration}</td>
              <td>₹{meeting.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Meetings;
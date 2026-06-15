import { useEffect, useState } from "react";
import api from "../services/api";
import MetricCard from "../components/MetricCard";
import AIInsights from "../components/AIInsights";

function Dashboard() {
  const [meetingCount, setMeetingCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    api.get("/analytics/meeting-count")
      .then(res => setMeetingCount(res.data.meeting_count));

    api.get("/analytics/total-cost")
      .then(res => setTotalCost(res.data.total_hr_cost));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>HRlytics AI Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        <MetricCard
          title="Meetings"
          value={meetingCount}
        />

        <MetricCard
          title="Total HR Cost"
          value={`₹${totalCost}`}
        />
      </div>
    </div>
  );
}

<AIInsights />

export default Dashboard;
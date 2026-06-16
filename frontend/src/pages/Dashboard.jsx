import { useEffect, useState } from "react";
import api from "../services/api";
import MetricCard from "../components/MetricCard";
import AIInsights from "../components/AIInsights";
import ExecutiveSummary from "../components/ExecutiveSummary";

function Dashboard() {
  const [meetingCount, setMeetingCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [insights, setInsights] = useState({
  average_cost: 0,
  highest_cost: 0,
  highest_meeting: ""
});

  useEffect(() => {
  api.get("/analytics/meeting-count")
    .then((res) => {
      setMeetingCount(res.data.meeting_count);
    });

  api.get("/analytics/total-cost")
    .then((res) => {
      setTotalCost(res.data.total_hr_cost);
    });

  api.get("/insights/")
    .then((res) => {
      setInsights(res.data);
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
        marginBottom: "30px",
      }}
    >
      Workforce Intelligence Command Center
    </h1>

      <ExecutiveSummary
  totalCost={totalCost}
  meetingCount={meetingCount}
  insights={insights}
/>

    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
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

      <MetricCard
  title="Average Meeting Cost"
  value={`₹${insights.average_cost}`}
/>

<MetricCard
  title="Highest Cost Meeting"
  value={insights.highest_meeting}
/>
    </div>

    <AIInsights insights={insights} />
  </div>
);
}


export default Dashboard;
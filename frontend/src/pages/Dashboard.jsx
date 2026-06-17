import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    highest_meeting: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/analytics/meeting-count"),
      api.get("/analytics/total-cost"),
      api.get("/insights/"),
    ])
      .then(([meetingRes, costRes, insightsRes]) => {
        setMeetingCount(meetingRes.data.meeting_count);

        setTotalCost(costRes.data.total_hr_cost);

        setInsights(insightsRes.data);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      style={{
        marginLeft: "280px",
        padding: "30px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "fixed",
          top: "-200px",
          right: "-200px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(96,165,250,0.12)",
          filter: "blur(120px)",
          zIndex: -1,
        }}
      />

      <h1
        style={{
          fontSize: "42px",
          fontWeight: "700",
          background:
            "linear-gradient(90deg,#60a5fa,#a855f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
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
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <MetricCard
          title="Meetings"
          value={
            loading
              ? "Loading..."
              : meetingCount
          }
        />

        <MetricCard
          title="Total HR Cost"
          value={
            loading
              ? "Loading..."
              : `₹${totalCost}`
          }
        />

        <MetricCard
          title="Average Meeting Cost"
          value={
            loading
              ? "Loading..."
              : `₹${Math.round(
                  insights.average_cost
                )}`
          }
        />

        <MetricCard
          title="Highest Cost Meeting"
          value={
            loading
              ? "Loading..."
              : insights.highest_meeting
          }
        />
      </div>

      <AIInsights insights={insights} />

      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "#94a3b8",
          fontSize: "14px",
        }}
      >
        Built by Pravalika Palle • HRlytics AI
      </div>
    </motion.div>
  );
}

export default Dashboard;
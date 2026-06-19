import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import api from "../services/api";
import MetricCard from "../components/MetricCard";
import AIInsights from "../components/AIInsights";
import ExecutiveSummary from "../components/ExecutiveSummary";

function Dashboard() {
  const [meetingCount, setMeetingCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const healthScore = Math.max(
  0,
  100 -
    totalCost / 500 -
    meetingCount * 2
);
  const [reduction, setReduction] =
  useState(0);

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
  
  const riskScore =
  totalCost > 50000
    ? 65
    : totalCost > 20000
    ? 80
    : 95;

  const generatePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("HRlytics AI Executive Report", 14, 20);

  doc.setFontSize(12);

  doc.text(
    `Total Workforce Spend: ₹${totalCost}`,
    14,
    40
  );

  doc.text(
    `Total Meetings: ${meetingCount}`,
    14,
    50
  );

  doc.text(
    `Average Meeting Cost: ₹${insights.average_cost || 0}`,
    14,
    60
  );

  doc.text(
    `Highest Cost Meeting: ${
      insights.highest_meeting || "N/A"
    }`,
    14,
    70
  );

  autoTable(doc, {
    startY: 90,
    head: [["AI Workforce Insights"]],
    body: [
      [
        `Highest Cost Meeting: ${
          insights.highest_meeting || "N/A"
        }`,
      ],
      [
        `Average Cost: ₹${
          insights.average_cost || 0
        }`,
      ],
      [
        `Peak Meeting Cost: ₹${
          insights.peak_cost || 0
        }`,
      ],
    ],
  });

  doc.save("HRlytics_AI_Report.pdf");
};

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

      <div
  style={{
    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",
    padding: "30px",
    borderRadius: "24px",
    marginBottom: "30px",
    color: "white",
    boxShadow:
      "0 15px 40px rgba(37,99,235,0.25)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <div>
      <h2
        style={{
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        👋 Welcome back, HR Team
      </h2>

      <p
        style={{
          opacity: 0.9,
          fontSize: "16px",
        }}
      >
        Monitor workforce spending, meeting costs and AI insights in real time.
      </p>

      <button
  onClick={generatePDF}
  style={{
    marginTop: "20px",
    background:
      "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "12px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "700",
    transition: "0.3s",
  }}
>
  📄 Download Executive Report
</button>

    </div>

    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          padding: "12px 18px",
          borderRadius: "14px",
        }}
      >
        📊 {meetingCount} Meetings
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          padding: "12px 18px",
          borderRadius: "14px",
        }}
      >
        💰 ₹{totalCost}
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.15)",
          padding: "12px 18px",
          borderRadius: "14px",
        }}
      >
        🤖 AI Active
      </div>
    </div>
  </div>
</div>

      <ExecutiveSummary
        totalCost={totalCost}
        meetingCount={meetingCount}
        insights={insights}
      />

      <div
  style={{
    background:
      "linear-gradient(135deg,#10b981,#059669)",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "25px",
    color: "white",
    boxShadow:
      "0 10px 30px rgba(16,185,129,0.25)",
  }}
>
  <h2>🏆 Workforce Health Score</h2>

  <h1
    style={{
      fontSize: "52px",
      margin: "15px 0",
    }}
  >
    {healthScore.toFixed(0)}
  </h1>

  <p>
    {healthScore > 80
      ? "🟢 Excellent Workforce Efficiency"
      : healthScore > 60
      ? "🟡 Moderate Workforce Efficiency"
      : "🔴 Optimization Needed"}
  </p>
</div>

<div
  style={{
    background: "#111827",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "25px",
  }}
>
  <h2>💡 Cost Saving Opportunities</h2>

  <div
    style={{
      marginTop: "15px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    <div>
      💰 Potential Monthly Savings:
      ₹{Math.round(totalCost * 0.15)}
    </div>

    <div>
      🎯 Reduce recurring meetings
    </div>

    <div>
      👥 Limit unnecessary attendees
    </div>

    <div>
      📅 Merge duplicate review sessions
    </div>
  </div>
</div>

<div
  style={{
    background: "#111827",
    padding: "25px",
    borderRadius: "20px",
    marginTop: "30px",
    marginBottom: "30px",
  }}
>
  <h2>🔮 Predicted Next Month Cost</h2>

  <h1
    style={{
      marginTop: "15px",
      color: "#60A5FA",
    }}
  >
    ₹{Math.round(totalCost * 1.15)}
  </h1>

  <p
    style={{
      color: "#94a3b8",
      marginTop: "10px",
    }}
  >
    Projected 15% increase based on current workforce spending trends.
  </p>
</div>

<div
  style={{
    textAlign: "center",
    marginTop: "50px",
  }}
></div>

      <div
  style={{
    background: "#111827",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "30px",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    💰 Cost Savings Simulator
  </h2>

  <input
    type="number"
    placeholder="Reduce meetings by %"
    value={reduction}
    onChange={(e) =>
      setReduction(e.target.value)
    }
    style={{
      padding: "12px",
      width: "250px",
      borderRadius: "10px",
      border: "none",
      marginRight: "15px",
    }}
  />

  <h3 style={{ marginTop: "20px" }}>
    Estimated Savings: ₹
    {Math.round(
      (totalCost * reduction) / 100
    )}
  </h3>
</div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
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

        <MetricCard
  title="Risk Score"
  value={`${riskScore}/100`}
/>      

      </div>

      <AIInsights insights={insights} />

      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "#c1d0e5",
          fontSize: "14px",
        }}
      >
        Built by Pravalika Palle • HRlytics AI
      </div>
    </motion.div>
  );
}

export default Dashboard;
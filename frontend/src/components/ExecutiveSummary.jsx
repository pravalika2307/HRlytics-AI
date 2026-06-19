function ExecutiveSummary({
  totalCost,
  meetingCount,
  insights,
}) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "25px",
        borderRadius: "20px",
        marginBottom: "30px",
      }}
    >
      <h2>Executive Summary</h2>

      <br />

      <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }}
>
  <p style={{ margin: 0 }}>
    💰 Total Workforce Spend: ₹{totalCost}
  </p>

  <p style={{ margin: 0 }}>
    📊 Total Meetings: {meetingCount}
  </p>

  <p style={{ margin: 0 }}>
    🎯 Highest Cost Meeting: {insights.highest_meeting}
  </p>

  <p style={{ margin: 0 }}>
    📈 Average Meeting Cost: ₹{insights.average_cost}
  </p>

  <p style={{ margin: 0 }}>
    🤖 Recommendation: Review recurring meetings with high attendance and cost.
  </p>
</div>
    </div>
  );
}

export default ExecutiveSummary;
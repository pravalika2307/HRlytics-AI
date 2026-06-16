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

      <p>
        💰 Total Workforce Spend: ₹{totalCost}
      </p>

      <br />

      <p>
        📊 Total Meetings: {meetingCount}
      </p>

      <br />

      <p>
        🎯 Highest Cost Meeting:
        {" "}
        {insights.highest_meeting}
      </p>

      <br />

      <p>
        📈 Average Meeting Cost:
        ₹{insights.average_cost}
      </p>

      <br />

      <p>
        🤖 Recommendation:
        Review recurring meetings with high attendance and cost.
      </p>
    </div>
  );
}

export default ExecutiveSummary;
function AIInsights({ insights }) {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: "20px",
        padding: "20px",
        marginTop: "30px"
      }}
    >
      <h2>AI Workforce Insights</h2>

      <br />

      <p>
        💰 Highest Cost Meeting:
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
        🎯 Peak Meeting Cost:
        ₹{insights.highest_cost}
      </p>
    </div>
  );
}

export default AIInsights;
function MetricCard({ title, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        padding: "25px",
        minWidth: "250px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <p
        style={{
          color: "#94a3b8",
          marginBottom: "10px",
        }}
      >
        {title}
      </p>

      <h1>{value}</h1>
    </div>
  );
}

export default MetricCard;
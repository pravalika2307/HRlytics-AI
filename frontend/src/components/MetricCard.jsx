function MetricCard({ title, value }) {
  return (
    <div
      style={{
        
              background: "linear-gradient(135deg,#1f2937,#111827)",
              borderRadius: "20px",
              padding: "25px",
              minWidth: "220px",
              boxShadow:"0 8px 25px rgba(0,0,0,0.25)",
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
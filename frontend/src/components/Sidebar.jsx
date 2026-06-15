import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#111827",
        padding: "30px",
        position: "fixed",
      }}
    >
      <h2
        style={{
          color: "#60a5fa",
          marginBottom: "40px",
        }}
      >
        HRlytics AI
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link to="/">Dashboard</Link>
        <Link to="/meetings">Meetings</Link>
        <Link to="/analytics">Analytics</Link>
      </div>
    </div>
  );
}

export default Sidebar;
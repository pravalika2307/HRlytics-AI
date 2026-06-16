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
      <h2>
        HRlytics AI
      </h2>

      <p
        style={{
          color: "#9ca3af",
          fontSize: "12px",
        }}
      >
        Workforce Intelligence Platform
      </p>

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
        <Link to="/advisor">AI Workforce Advisor</Link>
      </div>
    </div>
  );
}

export default Sidebar;
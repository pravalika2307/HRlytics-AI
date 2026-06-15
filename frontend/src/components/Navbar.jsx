import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        background: "#111827",
        color: "white",
      }}
    >
      <h2>HRlytics AI</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to="/"
        >
          Dashboard
        </Link>

        <Link
          style={{ color: "white", textDecoration: "none" }}
          to="/meetings"
        >
          Meetings
        </Link>

        <Link
          style={{ color: "white", textDecoration: "none" }}
          to="/analytics"
        >
          Analytics
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
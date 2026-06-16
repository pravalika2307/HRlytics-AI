import { Link } from "react-router-dom";

import {
  FaChartPie,
  FaClipboardList,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

function Sidebar() {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        background: "#111827",
        padding: "30px",
        position: "fixed",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "80px",
          letterSpacing: "0.5px",
        }}
      >
        HRlytics AI
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#60A5FA";
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          <FaChartPie
            style={{
              color: "#60A5FA",
            }}
          />
          Dashboard
        </Link>

        <Link
          to="/meetings"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#60A5FA";
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          <FaClipboardList
            style={{
              color: "#60A5FA",
            }}
          />
          Meetings
        </Link>

        <Link
          to="/analytics"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#60A5FA";
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          <FaChartLine
            style={{
              color: "#60A5FA",
            }}
          />
          Analytics
        </Link>

        <Link
          to="/advisor"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#60A5FA";
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          <FaRobot
            style={{
              color: "#60A5FA",
            }}
          />
          AI Workforce Advisor
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
import { NavLink } from "react-router-dom";

import {
  FaChartPie,
  FaClipboardList,
  FaChartLine,
  FaRobot,
} from "react-icons/fa";

function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#60A5FA" : "white",
    background: isActive
      ? "rgba(96,165,250,0.15)"
      : "transparent",
    textDecoration: "none",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    fontWeight: isActive ? "600" : "500",
  });

  return (
    <div
      style={{
  width: "280px",
  height: "100vh",
  background: "#111827",
  padding: "30px",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  boxSizing: "border-box",
  borderRight: "1px solid #1f2937",
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
          gap: "16px",
        }}
      >
        <NavLink
          to="/"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          <FaChartPie />
          Dashboard
        </NavLink>

        <NavLink
          to="/meetings"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          <FaClipboardList />
          Meetings
        </NavLink>

        <NavLink
          to="/analytics"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          <FaChartLine />
          Analytics
        </NavLink>

        <NavLink
          to="/advisor"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          <FaRobot />
          AI Workforce Advisor
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
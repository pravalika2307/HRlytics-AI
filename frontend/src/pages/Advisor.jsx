import { useEffect, useState } from "react";
import api from "../services/api";

function Advisor() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    api
      .get("/advisor/")
      .then((res) => {
        setInsights(res.data.insights);
      });
  }, []);

  return (
    <div
      style={{
        marginLeft: "280px",
        padding: "30px",
      }}
    >
      <h1>AI Workforce Advisor</h1>

      <div
        style={{
          marginTop: "20px",
          background: "#111827",
          padding: "25px",
          borderRadius: "20px",
        }}
      >
        {insights.map((item, index) => (
          <p
            key={index}
            style={{
              marginBottom: "15px",
            }}
          >
            🤖 {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Advisor;
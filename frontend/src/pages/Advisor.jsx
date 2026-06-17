import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

function Advisor() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    api.get("/advisor/")
      .then((res) => {
        setInsights(res.data.insights || []);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginLeft: "280px",
        padding: "30px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
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
        {insights.length > 0 ? (
          insights.map((item, index) => (
            <p
              key={index}
              style={{
                marginBottom: "15px",
              }}
            >
              🤖 {item}
            </p>
          ))
        ) : (
          <p>No insights available.</p>
        )}
      </div>
    </motion.div>
  );
}

export default Advisor;
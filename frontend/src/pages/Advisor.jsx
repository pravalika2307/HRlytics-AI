import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

function Advisor() {
const [insights, setInsights] = useState([]);

useEffect(() => {
api.get("/advisor/")
.then((res) => {
setInsights(res.data.insights || []);
})
.catch((err) => {
console.error(err);
});
}, []);

const cards = [
{
title: "Cost Optimization",
icon: "💰",
color: "#16a34a",
description:
"Identify expensive meetings and reduce recurring overhead.",
},
{
title: "Workforce Efficiency",
icon: "📈",
color: "#2563eb",
description:
"Improve productivity through better scheduling.",
},
{
title: "AI Recommendations",
icon: "🤖",
color: "#9333ea",
description:
"Actionable suggestions generated from workforce data.",
},
];

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
<h1
style={{
fontSize: "36px",
marginBottom: "30px",
}}
>
🤖 AI Workforce Advisor </h1>

  <div
    style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      marginBottom: "30px",
    }}
  >
    {cards.map((card, index) => (
      <motion.div
        key={index}
        whileHover={{
          scale: 1.04,
        }}
        style={{
          flex: "1",
          minWidth: "250px",
          background:
            "linear-gradient(135deg,#111827,#1e293b)",
          padding: "20px",
          borderRadius: "20px",
          border: `1px solid ${card.color}`,
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          {card.icon}
        </div>

        <h3
          style={{
            marginBottom: "10px",
          }}
        >
          {card.title}
        </h3>

        <p
          style={{
            color: "#94a3b8",
            lineHeight: "1.6",
          }}
        >
          {card.description}
        </p>
      </motion.div>
    ))}
  </div>

  <div
    style={{
      background:
        "linear-gradient(135deg,#111827,#1e293b)",
      borderRadius: "20px",
      padding: "25px",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.25)",
    }}
  >
    <h2
      style={{
        marginBottom: "20px",
      }}
    >
      🧠 AI Workforce Insights
    </h2>

    {insights.length > 0 ? (
      insights.map((item, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: index * 0.15,
          }}
          whileHover={{
            scale: 1.02,
          }}
          style={{
            marginBottom: "15px",
            padding: "18px",
            background: "#1f2937",
            borderRadius: "12px",
            borderLeft:
              "4px solid #60A5FA",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
            }}
          >
            <span>
              🤖 {item}
            </span>

            <span
              style={{
                background:
                  "rgba(96,165,250,0.2)",
                color: "#60A5FA",
                padding:
                  "6px 10px",
                borderRadius:
                  "999px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              Confidence 92%
            </span>
          </div>
        </motion.div>
      ))
    ) : (
      <div
        style={{
          textAlign: "center",
          color: "#94a3b8",
          padding: "40px",
        }}
      >
        No insights available.
      </div>
    )}
  </div>

  <div
    style={{
      textAlign: "center",
      marginTop: "40px",
      color: "#94a3b8",
      fontSize: "14px",
    }}
  >
    Powered by HRlytics AI • Workforce Intelligence Platform
  </div>
</motion.div>


);
}

export default Advisor;

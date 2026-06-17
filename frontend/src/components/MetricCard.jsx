import { motion } from "framer-motion";

function MetricCard({ title, value }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      style={{
        background:
          "linear-gradient(135deg,#172554,#0f172a)",
        padding: "30px",
        borderRadius: "20px",
        minWidth: "220px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.3)",
      }}
    >
      <h3
        style={{
          color: "#94a3b8",
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: "white",
          fontSize: "42px",
          fontWeight: "700",
        }}
      >
        {value}
      </h1>
    </motion.div>
  );
}

export default MetricCard;
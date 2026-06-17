import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/meetings/")
      .then((res) => {
        setData(res.data);
      });
  }, []);

console.log(data);

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
      <h1>Analytics Dashboard</h1>

      <div
        style={{
          marginTop: "30px",
          background: "#111827",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <h2>Meeting Cost Distribution</h2>

        <div
          style={{
            width: "100%",
            minHeight: "400px",
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="cost"
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

export default Analytics;
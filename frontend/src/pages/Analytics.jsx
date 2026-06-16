import { useEffect, useState } from "react";

import api from "../services/api";

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
    api
      .get("/dashboard/summary")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div
      style={{
        marginLeft: "280px",
        padding: "30px",
      }}
    >
      <h1>Analytics</h1>

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
            height: "400px",
          }}
        >
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

import {
ResponsiveContainer,
BarChart,
Bar,
LineChart,
Line,
PieChart,
Pie,
Cell,
Legend,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
} from "recharts";

function Analytics() {
const [data, setData] = useState([]);

useEffect(() => {
api.get("/meetings/")
.then((res) => {
setData(res.data);
});
}, []);

const totalCost = data.reduce(
(sum, meeting) => sum + meeting.cost,
0
);

const averageCost =
data.length > 0
? Math.round(totalCost / data.length)
: 0;

const highestMeeting =
data.length > 0
? data.reduce((prev, current) =>
prev.cost > current.cost
? prev
: current
)
: null;

const highConfidence = data.filter(
  (m) => m.confidence >= 90
).length;

const mediumConfidence =
  data.filter(
    (m) =>
      m.confidence >= 70 &&
      m.confidence < 90
  ).length;

const lowConfidence = data.filter(
  (m) => m.confidence < 70
).length;

const COLORS = [
"#60A5FA",
"#34D399",
"#FBBF24",
"#F87171",
"#A78BFA",
"#22D3EE",
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
Analytics Dashboard </h1>

  <div
    style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      marginBottom: "30px",
    }}
  >
    {[
      {
        title: "Total Meetings",
        value: data.length,
      },
      {
        title: "Total Cost",
        value: `₹${totalCost}`,
      },
      {
        title: "Average Cost",
        value: `₹${averageCost}`,
      },
      {
        title: "Highest Cost",
        value: highestMeeting
          ? highestMeeting.title
          : "N/A",
      },
    ].map((card, index) => (
      <motion.div
        key={index}
        whileHover={{
          scale: 1.05,
        }}
        style={{
          background:
            "linear-gradient(135deg,#111827,#1e293b)",
          padding: "20px",
          borderRadius: "20px",
          minWidth: "220px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h4
          style={{
            color: "#94a3b8",
          }}
        >
          {card.title}
        </h4>

        <h2
          style={{
            marginTop: "10px",
          }}
        >
          {card.value}
        </h2>
      </motion.div>
    ))}
  </div>

  <div
    style={{
      background:
        "linear-gradient(135deg,#111827,#1e293b)",
      padding: "25px",
      borderRadius: "20px",
      marginBottom: "30px",
    }}
  >
    <h2>📊 Meeting Cost Distribution</h2>
    
    <div
  style={{
    background:
      "linear-gradient(135deg,#111827,#1e293b)",
    padding: "25px",
    borderRadius: "20px",
    marginBottom: "30px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    🎯 AI Confidence Analytics
  </h2>

  <div
    style={{
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    }}
  >
    <div
      style={{
        background: "#166534",
        padding: "15px 20px",
        borderRadius: "12px",
      }}
    >
      🟢 High Confidence: {highConfidence}
    </div>

    <div
      style={{
        background: "#a16207",
        padding: "15px 20px",
        borderRadius: "12px",
      }}
    >
      🟡 Medium Confidence: {mediumConfidence}
    </div>

    <div
      style={{
        background: "#991b1b",
        padding: "15px 20px",
        borderRadius: "12px",
      }}
    >
      🔴 Low Confidence: {lowConfidence}
    </div>
  </div>
</div>

    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <BarChart data={data}>
        <CartesianGrid
          stroke="#334155"
          strokeDasharray="3 3"
        />

        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="cost"
          fill="#60A5FA"
          radius={[10, 10, 0, 0]}
          animationDuration={1800}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div
    style={{
      background:
        "linear-gradient(135deg,#111827,#1e293b)",
      padding: "25px",
      borderRadius: "20px",
      marginBottom: "30px",
    }}
  >
    <h2>📈 Workforce Cost Trend</h2>

    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <LineChart data={data}>
        <CartesianGrid
          stroke="#334155"
          strokeDasharray="3 3"
        />

        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="cost"
          stroke="#60A5FA"
          strokeWidth={4}
          dot={{
            r: 6,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

  <div
    style={{
      background:
        "linear-gradient(135deg,#111827,#1e293b)",
      padding: "25px",
      borderRadius: "20px",
      marginBottom: "30px",
    }}
  >
    <h2>🥧 Cost Distribution by Meeting</h2>

    <ResponsiveContainer
      width="100%"
      height={450}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="cost"
          nameKey="title"
          outerRadius={150}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={
                COLORS[
                  index % COLORS.length
                ]
              }
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
  
  <div
  style={{
    background:
      "linear-gradient(135deg,#111827,#1e293b)",
    padding: "25px",
    borderRadius: "20px",
    marginTop: "30px",
  }}
>
  <h2>🏆 Top Cost Drivers</h2>

  {data
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5)
    .map((meeting) => (
      <div
        key={meeting.id}
        style={{
          marginTop: "15px",
        }}
      >
        <p>{meeting.title}</p>

        <div
          style={{
            background: "#1f2937",
            height: "10px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${
                (meeting.cost /
                  data[0].cost) *
                100
              }%`,
              background: "#60A5FA",
              height: "100%",
            }}
          />
        </div>
      </div>
    ))}
</div>

  <div
    style={{
      background:
        "linear-gradient(135deg,#111827,#1e293b)",
      padding: "25px",
      borderRadius: "20px",
    }}
  >
    <h2
      style={{
        marginBottom: "20px",
      }}
    >
      🏆 Top Costly Meetings
    </h2>

    {data
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 3)
      .map((meeting, index) => (
        <div
          key={meeting.id}
          style={{
            marginBottom: "15px",
            padding: "15px",
            background: "#1f2937",
            borderRadius: "12px",
          }}
        >
          #{index + 1} • {meeting.title}
          <span
            style={{
              float: "right",
              color: "#60A5FA",
              fontWeight: "bold",
            }}
          >
            ₹{meeting.cost}
          </span>
        </div>
      ))}
  </div>

  <div
    style={{
      textAlign: "center",
      marginTop: "40px",
      color: "#94a3b8",
    }}
  >
    Built by Pravalika Palle • HRlytics AI
  </div>
</motion.div>


);
}

export default Analytics;

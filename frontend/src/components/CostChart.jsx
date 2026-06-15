import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { week: "W1", cost: 5000 },
  { week: "W2", cost: 9000 },
  { week: "W3", cost: 14000 },
  { week: "W4", cost: 22000 },
];

function CostChart() {
  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "20px",
        marginTop: "30px",
      }}
    >
      <h2>Workforce Cost Trend</h2>

      <div
        style={{
          width: "100%",
          height: 350,
        }}
      >
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cost"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CostChart;
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Meetings",
    value: 10,
  },
  {
    name: "Projects",
    value: 4,
  },
  {
    name: "Teams",
    value: 3,
  },
];

function Analytics() {
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
          width: "100%",
          height: 400,
          marginTop: "20px",
        }}
      >
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;
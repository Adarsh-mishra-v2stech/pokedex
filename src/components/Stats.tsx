import React from "react";
import { Row, Typography, Divider } from "antd";
import { statColors } from "../utils/helpers";

interface StatsProps {
  stats: { base_stat: number; stat: { name: string } }[];
}
const { Text } = Typography;
const Stats: React.FC<StatsProps> = ({ stats }) => (
  <>
    <Divider />
    <Row justify="space-between">
      <Text strong>Base Stats</Text>
    </Row>
    {stats.map(({ base_stat, stat }) => (
      <div key={stat.name} style={{ marginBottom: "10px" }}>
        <Row justify="space-between" style={{ marginBottom: "6px" }}>
          <Text
            style={{
              textTransform: "capitalize",
              color: "#4A4A4A",
              fontWeight: 500,
            }}
          >
            {stat.name.replace("-", " ")}
          </Text>
          <Text style={{ fontWeight: 600 }}>{base_stat}</Text>
        </Row>
        <div
          style={{
            background: "#F0F0F0",
            borderRadius: "4px",
            overflow: "hidden",
            height: "6px",
          }}
        >
          <div
            style={{
              width: `${(base_stat / 255) * 100}%`,
              backgroundColor: statColors[stat.name],
              height: "100%",
            }}
          />
        </div>
      </div>
    ))}
  </>
);

export default Stats;

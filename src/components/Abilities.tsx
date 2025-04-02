import React from "react";
import { Row, Col, Tag, Divider, Typography } from "antd";

interface AbilitiesProps {
  abilities: { ability: { name: string } }[];
}

const { Text } = Typography;

const Abilities: React.FC<AbilitiesProps> = ({ abilities }) => (
  <>
    <Divider />
    <Row justify="space-between">
      <Text strong>Abilities</Text>
    </Row>
    <Row gutter={[8, 8]} style={{ marginTop: "6px" }}>
      {abilities.map(({ ability }) => (
        <Col key={ability.name}>
          <Tag
            color="magenta"
            style={{ padding: "6px 12px", fontSize: "14px" }}
          >
            {ability.name}
          </Tag>
        </Col>
      ))}
    </Row>
  </>
);

export default Abilities;

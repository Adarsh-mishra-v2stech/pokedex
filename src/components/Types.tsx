import React from "react";
import { Row, Col, Tag } from "antd";
import { colors, getTypeColor } from "../utils/helpers";

interface TypesProps {
  types: {
    type: {
      name: string;
    };
  }[];
}

const Types: React.FC<TypesProps> = ({ types }) => (
  <Row gutter={[8, 8]}>
    {types.map(({ type }) => (
      <Col key={type.name}>
        <Tag
          style={{
            backgroundColor: colors[type.name],
            textTransform: "uppercase",
            fontWeight: 500,
            border: "none",
            color: "white",
          }}
        >
          {type.name}
        </Tag>
      </Col>
    ))}
  </Row>
);

export default Types;

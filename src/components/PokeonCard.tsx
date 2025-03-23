import React from "react";
import { Card, Row, Col, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import { usePokemonDetails, usePokemonSpecies } from "../hooks/usePokemon";
import {
  formatPokemonId,
  getEnglishFlavorText,
  getTypeColor,
} from "../utils/helpers";

const { Text, Title } = Typography;

const PokemonCard = ({ name }: { name: string }) => {
  const { data: pokemon, isLoading: isLoadingPokemon } =
    usePokemonDetails(name);
  const { data: species, isLoading: isLoadingSpecies } = usePokemonSpecies(
    pokemon?.id || 0
  );

  if (isLoadingPokemon || isLoadingSpecies || !pokemon) {
    return <Card loading style={{ height: 400 }} />;
  }

  const description = species
    ? getEnglishFlavorText(species.flavor_text_entries)
    : "";

  return (
    <Card hoverable>
      <Row gutter={16} wrap={false} align="top">
        <Col flex="auto">
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 12 }}
          >
            <Col>
              <Title
                level={5}
                style={{
                  margin: 0,
                  textTransform: "capitalize",
                }}
              >
                {pokemon.name}
              </Title>
            </Col>
            <Col>
              <Text type="secondary" style={{ fontSize: 14 }}>
                {formatPokemonId(pokemon.id)}
              </Text>
            </Col>
          </Row>

          <div style={{ marginBottom: 12 }}>
            {pokemon.types.map(({ type }: any) => (
              <Tag
                key={type.name}
                color={getTypeColor(type.name)}
                style={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  border: "none",
                  color: "white",
                }}
              >
                {type.name}
              </Tag>
            ))}
          </div>

          <Text
            type="secondary"
            style={{
              display: "block",
              fontSize: 14,
              lineHeight: 1.5,
              marginBottom: 16,
            }}
          >
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </Text>

          <Link to={`/pokemon/${name}`}>
            <Text strong style={{ fontSize: 14 }}>
              Know More →
            </Text>
          </Link>
        </Col>

        <Col flex="none" style={{ width: 150 }}>
          <div>
            <img
              alt={pokemon.name}
              src={pokemon.sprites.other["official-artwork"].front_default}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default PokemonCard;

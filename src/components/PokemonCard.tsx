import React, { useMemo } from "react";
import { Card, Row, Col, Tag, Typography } from "antd";
import { Link } from "react-router-dom";
import { usePokemonDetails, usePokemonSpecies } from "../hooks/usePokemon";
import { formatPokemonId, getEnglishFlavorText } from "../utils/helpers";
import { pokemonType } from "../type";
import Types from "./Types";

const { Text, Title, Paragraph } = Typography;

const PokemonCard = ({ name }: { name: string }) => {
  const { data: pokemon, isLoading: isLoadingPokemon } =
    usePokemonDetails(name);
  const { data: species, isLoading: isLoadingSpecies } = usePokemonSpecies(
    pokemon?.id || 0
  );

  const isLoading = isLoadingPokemon || isLoadingSpecies || !pokemon;

  const description = useMemo(() => {
    return species ? getEnglishFlavorText(species.flavor_text_entries) : "";
  }, [species]);

  return (
    <Card loading={isLoading} style={{ height: 300 }}>
      {!isLoading && (
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
              <Types types={pokemon.types as pokemonType[]} />
            </div>

            <Paragraph
              type="secondary"
              style={{
                display: "block",
                fontSize: 14,
                lineHeight: 1.5,
                marginBottom: 16,
              }}
              ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
            >
              {description}
            </Paragraph>

            <Link to={`/pokemon/${pokemon.id}`}>
              <Text strong style={{ fontSize: 14 }}>
                Know More →
              </Text>
            </Link>
          </Col>

          <Col flex="none" style={{ width: 150 }}>
            <img
              alt={pokemon.name}
              src={pokemon.sprites.other["official-artwork"].front_default}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default PokemonCard;

import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Card, Button, Spin, Row, Col, Typography, Empty } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { usePokemonDetails, usePokemonSpecies } from "../hooks/usePokemon";
import { getEnglishFlavorText, formatPokemonId } from "../utils/helpers";
import Types from "../components/Types";
import Stats from "../components/Stats";
import Abilities from "../components/Abilities";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: pokemon, isLoading: isLoadingPokemon } = usePokemonDetails(
    id || ""
  );
  const { data: species, isLoading: isLoadingSpecies } = usePokemonSpecies(
    pokemon?.id || 0
  );

  const description = useMemo(
    () => (species ? getEnglishFlavorText(species.flavor_text_entries) : ""),
    [species]
  );

  const handleNavigation = (offset: number) => {
    const newId = pokemon.id + offset;
    if (newId > 0) {
      navigate(`/pokemon/${newId}`);
    }
  };

  if (isLoadingPokemon || isLoadingSpecies) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </Layout>
    );
  }

  if (!pokemon) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Empty description="Pokemon not found" />
      </Layout>
    );
  }

  return (
    <Content style={{ padding: "10px", maxWidth: "800px", margin: "0 auto" }}>
      <Button
        icon={<LeftOutlined />}
        onClick={() => navigate("/")}
        style={{
          marginBottom: "10px",
          color: "#FF5350",
          borderColor: "#FF5350",
        }}
      >
        Back to Pokédex
      </Button>

      <Card style={{ padding: "10px" }}>
        <Types types={pokemon.types} />
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              style={{ width: "80%", height: "auto" }}
            />
          </Col>

          <Col xs={24} md={12}>
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: "10px" }}
            >
              <Title
                level={2}
                style={{ textTransform: "capitalize", margin: 0 }}
              >
                {pokemon.name}
              </Title>
              <Text
                style={{ fontSize: "20px", color: "#666", fontWeight: 600 }}
              >
                {formatPokemonId(pokemon.id)}
              </Text>
            </Row>
            <Paragraph
              style={{ fontSize: "16px", lineHeight: 1.5, color: "#4A4A4A" }}
            >
              {description}
            </Paragraph>

            <Row
              gutter={[8, 8]}
              style={{
                padding: "10px",
                background: "white",
                borderRadius: "8px",
                border: "1px solid #F0F0F0",
              }}
            >
              <Col span={12}>
                <Text type="secondary">Height</Text>
                <Paragraph style={{ fontSize: "16px", fontWeight: 600 }}>
                  {pokemon.height / 10}m
                </Paragraph>
              </Col>
              <Col span={12}>
                <Text type="secondary">Weight</Text>
                <Paragraph style={{ fontSize: "16px", fontWeight: 600 }}>
                  {pokemon.weight / 10}kg
                </Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
        <Stats stats={pokemon.stats} />
        <Abilities abilities={pokemon.abilities} />
      </Card>

      {/* Navigation Buttons */}
      <Row justify="space-between" style={{ marginTop: "20px" }}>
        <Button
          icon={<LeftOutlined />}
          onClick={() => handleNavigation(-1)}
          disabled={pokemon.id === 1}
          style={{ color: "#FF5350", borderColor: "#FF5350" }}
        >
          Previous Pokémon
        </Button>
        <Button
          onClick={() => handleNavigation(1)}
          type="primary"
          style={{ backgroundColor: "#FF5350", color: "white" }}
        >
          Next Pokémon
          <RightOutlined />
        </Button>
      </Row>
    </Content>
  );
};

export default PokemonDetails;

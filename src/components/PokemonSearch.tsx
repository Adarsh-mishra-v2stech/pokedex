import React, { useState } from "react";
import pokedex from "../assets/pokedex.png";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { styles } from "./style";

const PokemonSearch = ({
  onSearch,
  handleQuerySearch,
}: {
  onSearch: (query: string) => void;
  handleQuerySearch: () => void;
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
    onSearch(query);
    handleQuerySearch();
  };

  return (
    <div style={styles.container}>
      <img src={pokedex} alt="PokeDex" style={styles.logo} />
      <div style={styles.searchContainer}>
        <Input
          onChange={handleChange}
          placeholder="search eg, ditto or pikachu"
          style={{ ...styles.input, border: "none", boxShadow: "none" }}
        />
        <Button
          onClick={handleClick}
          type="primary"
          icon={<SearchOutlined />}
          style={styles.searchButton}
        />
      </div>
    </div>
  );
};

export default PokemonSearch;

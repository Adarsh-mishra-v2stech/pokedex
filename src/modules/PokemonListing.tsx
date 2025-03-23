import React, { useState } from "react";
import PokemonSearch from "../components/PokemonSearch";
import { usePokemonList, useSearchPokemon } from "../hooks/usePokemon";
import InfiniteScroll from "react-infinite-scroll-component";
import { Empty, Spin, Row, Col } from "antd";
import PokemonCard from "../components/PokeonCard";
import ScrollToTop from "../components/ScrollToTop";

const PokemonListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollTop, setScrollTop] = useState(false);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingList,
  } = usePokemonList();

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    refetch,
  } = useSearchPokemon(searchQuery);

  const isLoading = isLoadingList || isLoadingSearch;
  const pokemonList = searchQuery
    ? searchData?.results
    : infiniteData?.pages?.flatMap((page) => page.results) || [];

  const handleQuerySearch = () => {
    if (searchQuery) {
      refetch();
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScrollTop(true);
    } else {
      setScrollTop(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <PokemonSearch
        onSearch={setSearchQuery}
        handleQuerySearch={handleQuerySearch}
      />
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin size="large" />
        </div>
      ) : pokemonList!.length === 0 ? (
        <Empty description="No Pokémon found" style={{ margin: "40px 0" }} />
      ) : (
        <InfiniteScroll
          dataLength={pokemonList!.length}
          next={fetchNextPage}
          hasMore={!searchQuery && !!hasNextPage}
          loader={
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spin />
            </div>
          }
          style={{ overflow: "visible" }}
        >
          <Row
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
              padding: "24px",
              maxWidth: "1440px",
              margin: "0 auto",
            }}
          >
            {pokemonList?.map((pokemon) => (
              <Col key={pokemon?.name}>
                <PokemonCard name={pokemon?.name} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      )}
      {scrollTop && <ScrollToTop scrollToTop={scrollToTop} />}
    </div>
  );
};

export default PokemonListing;

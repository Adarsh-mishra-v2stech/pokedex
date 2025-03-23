import axios from "axios";
import { PokemonListResponse } from "../type";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemonList = async (
  offset: number = 0,
  limit: number = 20
) => {
  const response = await api.get(`/pokemon?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const getPokemonByName = async (name: string) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};

export const getPokemonSpecies = async (id: number) => {
  const response = await api.get(`/pokemon-species/${id}`);
  return response.data;
};

export const searchPokemon = async (query: string) => {
  const response = await api.get<PokemonListResponse>(`/pokemon?limit=1000`);
  const filtered = response.data.results.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(query.toLowerCase());
  });
  return { ...response.data, results: filtered };
};

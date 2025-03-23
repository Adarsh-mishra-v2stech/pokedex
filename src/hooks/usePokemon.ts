import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getPokemonByName,
  getPokemonList,
  getPokemonSpecies,
  searchPokemon,
} from "../services/api";

// export const usePokemonList = (page: number, limit: number = 20) => {
//   return useQuery({
//     queryKey: ["pokemonList", page],
//     queryFn: () => getPokemonList(page * limit, limit),
//     placeholderData: (previousData) => previousData,
//   });
// };

export const usePokemonList = (limit: number = 20) => {
  return useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: ({ pageParam = 0 }) => getPokemonList(pageParam, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined;
      return pages.length * limit;
    },
  });
};

export const usePokemonDetails = (name: string) => {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
  });
};

export const usePokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: ["pokemonSpecies", id],
    queryFn: () => getPokemonSpecies(id),
    enabled: !!id,
  });
};

export const useSearchPokemon = (query: string) => {
  return useQuery({
    queryKey: ["pokemonSearch", query],
    queryFn: () => searchPokemon(query),
    enabled: query.length > 0,
  });
};

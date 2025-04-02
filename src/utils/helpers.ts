export const formatPokemonId = (id: number): string => {
  return `#${String(id).padStart(3, "0")}`;
};
export const colors: { [key: string]: string } = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export const getTypeColor = (type: string): string => {
  return colors[type] || "#777777";
};

export const getEnglishFlavorText = (entries: any[]): string => {
  const englishEntry = entries.find((entry) => entry.language.name === "en");
  return englishEntry
    ? englishEntry.flavor_text.replace(/[\n\f]/g, " ")
    : "No description available.";
};

export const statColors: { [key: string]: string } = {
  hp: "#FF6347",
  attack: "#203940",
  defense: "#32CD32",
  "special-attack": "#1E90FF",
  "special-defense": "#FFD700",
  speed: "#EE82EE",
};

export function getStatColor(statName: string): string {
  return statColors[statName.toLowerCase()] || "#000000";
}

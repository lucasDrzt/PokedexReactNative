import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import PokemonBox from "./PokemonBox";
import SearchBar from "./SearchBar";

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPokemonNames();
  }, []);

  const fetchPokemonNames = async () => {
    try {
      const limit = 500;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
      );
      const data = await response.json();
      const fetchSpecies = data.results.map(async (pokemon) => {
        const speciesResponse = await fetch(pokemon.url);
        const speciesData = await speciesResponse.json();
        const speciesUrl = speciesData.species.url;
        const speciesInfoResponse = await fetch(speciesUrl);
        const speciesInfoData = await speciesInfoResponse.json();
        const frenchName = speciesInfoData.names.find(
          (name) => name.language.name === "fr"
        ).name;
        return {
          id: speciesData.id,
          name: frenchName,
        };
      });
      const pokemonNames = await Promise.all(fetchSpecies);
      setPokemonData(pokemonNames);
    } catch (error) {
      console.error(`Error fetching Pokemon names: ${error.message}`);
    }
  };

  const filteredPokemonData =
    searchTerm.length > 0
      ? pokemonData.filter((pokemon) => {
          const searchTermAsNumber = parseInt(searchTerm, 10);
          if (!isNaN(searchTermAsNumber)) {
            return pokemon.id === searchTermAsNumber;
          }
          return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
      : pokemonData;

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const renderItem = ({ item }) => <PokemonBox id={item.id} name={item.name} />;

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={filteredPokemonData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PokemonList;

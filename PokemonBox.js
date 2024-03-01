import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PokemonBox = ({ id, name }) => {
  
  const navigation = useNavigation();
  const [pokemonData, setPokemonData] = useState(null);
  const handlePress = () => {
    navigation.navigate("PokemonDetail", { pokemon: { id, name } });
  };
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
          const data = await response.json();

          const speciesResponse = await fetch(data.species.url);
          if (speciesResponse.ok) {
            const speciesData = await speciesResponse.json();

            const frenchNameEntry = speciesData.names.find(
              (name) => name.language.name === "fr"
            );
            const frenchName = frenchNameEntry
              ? frenchNameEntry.name
              : data.name;
            setPokemonData({
              ...data,
              name: frenchName,
            });
          } else {
            console.error(
              `Error fetching Pokemon species for ${id}: ${speciesResponse.status}`
            );
          }
        } else {
          console.error(`Error fetching Pokemon ${id}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error fetching Pokemon ${id}: ${error.message}`);
      }
    };

    fetchPokemonData();
  }, [id]);

  const navigateToPokemonDetail = () => {
    navigation.navigate("PokemonDetail", { pokemon: pokemonData });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateToPokemonDetail}
    >
      {pokemonData && (
        <>
          <Image
            style={styles.image}
            source={{ uri: pokemonData.sprites.front_default }}
          />
          <Text style={styles.name}>{pokemonData.name}</Text>
          <Text style={styles.number}>#{("0000" + id).slice(-4)}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightsteelblue",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  number: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textTransform: "capitalize",
  },
  image: {
    width: 96,
    height: 96,
    marginTop: 8,
  },
});

export default PokemonBox;

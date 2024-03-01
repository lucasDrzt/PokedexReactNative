import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTeam } from "./TeamContext"; 


const TeamScreen = () => {
  const { team, clearTeam } = useTeam();

  return (
    <View style={styles.container}>
      {team.length > 0 ? (
        team.map((pokemon, index) => (
          <View key={index} style={styles.pokemonCard}>
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
          </View>
        ))
      ) : (
        <Text style={{ textAlign: "center" }}>
          Aucun Pokémon dans votre équipe.
        </Text>
      )}
      <TouchableOpacity onPress={clearTeam} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Vider l'équipe</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  teamContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  pokemonName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default TeamScreen;

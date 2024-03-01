import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useTeam } from './TeamContext';

const TypeLabel = ({ type }) => {
  const typeStyles = {
    steel: { backgroundColor: "#9EB7B8", color: "#FFFFFF" },
    fighting: { backgroundColor: "#D56723", color: "#FFFFFF" },
    dragon: { backgroundColor: "#6F35FC", color: "#FFFFFF" },
    water: { backgroundColor: "#6390F0", color: "#FFFFFF" },
    electric: { backgroundColor: "#F7D02C", color: "#FFFFFF" },
    fairy: { backgroundColor: "#D685AD", color: "#FFFFFF" },
    fire: { backgroundColor: "#EE8130", color: "#FFFFFF" },
    ice: { backgroundColor: "#96D9D6", color: "#FFFFFF" },
    bug: { backgroundColor: "#A6B91A", color: "#FFFFFF" },
    normal: { backgroundColor: "#A8A77A", color: "#FFFFFF" },
    grass: { backgroundColor: "#7AC74C", color: "#FFFFFF" },
    poison: { backgroundColor: "#A33EA1", color: "#FFFFFF" },
    psychic: { backgroundColor: "#F95587", color: "#FFFFFF" },
    rock: { backgroundColor: "#B6A136", color: "#FFFFFF" },
    ground: { backgroundColor: "#E2BF65", color: "#FFFFFF" },
    ghost: { backgroundColor: "#735797", color: "#FFFFFF" },
    dark: { backgroundColor: "#705746", color: "#FFFFFF" },
    flying: { backgroundColor: "#A98FF3", color: "#FFFFFF" },
  };

  const typeStyle = typeStyles[type.toLowerCase()] || {
    backgroundColor: "#777777",
    color: "#FFFFFF",
  };

  return (
    <View style={[styles.typeLabel, typeStyle]}>
      <Text style={[styles.typeText, { color: typeStyle.color }]}>
        {type.toUpperCase()}
      </Text>
    </View>
  );
};

const PokemonDetail = ({ route }) => {
  const { pokemon } = route.params;
  const navigation = useNavigation();
  const { addPokemonToTeam } = useTeam();

  const handleAddToTeam = () => {
    addPokemonToTeam(pokemon);
  };
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Image
          source={require("./backButton.png")}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Image
          style={styles.sprite}
          source={{ uri: pokemon.sprites.front_default }}
        />
        <View style={styles.pokemonInfo}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.infoText}>N° Pokedex: {pokemon.id}</Text>
          <Text style={styles.infoText}>
            {pokemon.types.map((typeInfo) => (
              <TypeLabel key={typeInfo.type.name} type={typeInfo.type.name} />
            ))}
          </Text>
        </View>
      </View>
      <LineChart
        data={{
          labels: pokemon.stats.map((stat) => stat.stat.name),
          datasets: [
            {
              data: pokemon.stats.map((stat) => stat.base_stat),
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        yAxisLabel=""
        yAxisSuffix="pts"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForLabels: {
            fontSize: 8,
            rotation: -35,
            anchor: "end",
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          marginLeft: 8,
          borderRadius: 16,
        }}
      />
      <TouchableOpacity onPress={handleAddToTeam} style={styles.addToTeamButton}>
        <Text style={styles.addToTeamButtonText}>Ajouter à l'équipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  sprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  pokemonInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 2,
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
  },
  backIcon: {
    width: 50,
    height: 50,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  typeLabel: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  typeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  addToTeamButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  addToTeamButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PokemonDetail;

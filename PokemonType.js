import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const types = {
  Feu: {
    backgroundColor: '#EE8130',
    icon: 'fire'
  },
  Eau: {
    backgroundColor: '#6390F0',
    icon: 'tint'
  },
  // Ajoutez d'autres types ici avec leurs couleurs et icônes correspondantes
};

const PokemonTypeLabel = ({ type }) => {
  const typeInfo = types[type];
  
  return (
    <View style={[styles.typeLabel, { backgroundColor: typeInfo.backgroundColor }]}>
      <Icon name={typeInfo.icon} size={16} color="#fff" />
      <Text style={styles.typeText}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default PokemonTypeLabel;

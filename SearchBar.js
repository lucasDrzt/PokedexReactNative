// SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Entrez le nom d'un Pokémon"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Rechercher" onPress={() => onSearch(searchTerm)} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SearchBar;

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TeamContext = createContext();

export const useTeam = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const storedTeam = await AsyncStorage.getItem('team');
        if (storedTeam) setTeam(JSON.parse(storedTeam));
      } catch (error) {
        console.error("Erreur lors du chargement de l'équipe", error);
      }
    };

    loadTeam();
  }, []);

  useEffect(() => {
    const saveTeam = async () => {
      try {
        await AsyncStorage.setItem('team', JSON.stringify(team));
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'équipe", error);
      }
    };

    saveTeam();
  }, [team]);

  const addPokemonToTeam = (pokemon) => {
    if (team.length >= 6) {
      alert("L'équipe est déjà complète.");
      return;
    }
    setTeam(currentTeam => [...currentTeam, pokemon]);
  };

  const clearTeam = () => {
    setTeam([]);
  };

  return (
    <TeamContext.Provider value={{ team, addPokemonToTeam, clearTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

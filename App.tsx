import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  Catamaran_400Regular,
  Catamaran_700Bold,
} from "@expo-google-fonts/catamaran";

import PokemonList from "./PokemonList";
import PokemonDetail from "./PokemonDetail";
import TeamScreen from "./TeamScreen";

import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import Account from "./components/Account";
import { Session } from '@supabase/supabase-js';
import { TeamProvider } from './TeamContext'; 


const Tab = createBottomTabNavigator();
const PokedexStack = createStackNavigator();

function PokedexStackScreen() {
  return (
    <PokedexStack.Navigator>
      <PokedexStack.Screen
        name="PokemonList"
        component={PokemonList}
        options={{ headerShown: false }}
      />
      <PokedexStack.Screen
        name="PokemonDetail"
        component={PokemonDetail}
        options={{ headerShown: false }}
      />
    </PokedexStack.Navigator>
  );
}


export default function App() {

  const renderProfileComponent = () => {
    return session && session.user ? () => <Account key={session.user.id} session={session} /> : () => <Auth />;
};

  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  let [fontsLoaded] = useFonts({
    Catamaran_400Regular,
    Catamaran_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TeamProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "POKEDEX") {
              iconName = require("./assets/homebutton.png");
            } else if (route.name === "TON EQUIPE") {
              iconName = require("./assets/pokeball.png");
            } else if (route.name === "PROFIL") {
              iconName = require("./assets/profile.png");
            }
            return (
              <Image source={iconName} style={{ width: 24, height: 24 }} />
            );
          },
          headerStyle: {
            backgroundColor: "#CD2929",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: "Catamaran_700Bold",
          },
          tabBarStyle: { backgroundColor: "#2B2E4A" },
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontFamily: "Catamaran_400Regular",
          },
        })}
      >
        <Tab.Screen name="POKEDEX" component={PokedexStackScreen} />
        <Tab.Screen name="TON EQUIPE" component={TeamScreen} />
        <Tab.Screen name="PROFIL" component={renderProfileComponent()} />
      </Tab.Navigator>
    </NavigationContainer>
    
  </TeamProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

# Mon Application Pokédex

Ce projet est une application mobile React Native qui permet aux utilisateurs de créer leur propre équipe de Pokémon en utilisant la PokeAPI.

## Structure des fichiers

- `App.tsx`: Le point d'entrée de l'application. Configure la navigation et englobe l'application avec les fournisseurs de contexte nécessaires.
- `PokemonBox.js`: Un composant pour afficher un résumé d'un Pokémon. Utilisé dans les listes pour donner un aperçu rapide.
- `PokemonDetail.jsx`: Un composant d'écran qui affiche des informations détaillées sur un Pokémon spécifique, telles que ses statistiques et ses capacités.
- `PokemonList.js`: Un composant d'écran qui affiche une liste de Pokémon. Utilise `PokemonBox.js` pour chaque élément de la liste.
- `PokemonType.js`: Un composant qui affiche le type d'un Pokémon et applique un style basé sur le type.
- `SearchBar.js`: Un composant pour permettre aux utilisateurs de chercher des Pokémon par nom.
- `TeamContext.js`: Fournit un contexte React pour gérer l'état de l'équipe de Pokémon de l'utilisateur à travers l'application.
- `TeamScreen.js`: Un composant d'écran qui utilise `TeamContext` pour afficher et gérer l'équipe de Pokémon de l'utilisateur.

- ### Dossier `/components`
- `Account.tsx`: Ce composant gère l'affichage et la mise à jour des informations du compte utilisateur.
- `Auth.tsx`: Ce composant permet aux utilisateurs de s'authentifier. Il gère les formulaires de connexion et d'inscription.

### Dossier `/lib`
- `supabase.tsx`: Ce fichier configure l'instance Supabase utilisée pour l'authentification et la base de données.




![image](https://github.com/lucasDrzt/PokedexReactNative/assets/115454870/1b016a98-3b25-4d54-b71f-a1a060ce73b6)

![image](https://github.com/lucasDrzt/PokedexReactNative/assets/115454870/e52bae12-ab1d-42ba-bab9-8ba31506f823)

![image](https://github.com/lucasDrzt/PokedexReactNative/assets/115454870/e072313e-a0c6-455a-a7b3-2b912e0dbbdd)

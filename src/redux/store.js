import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

//Configuration du store Redux : c'est le "cerveau" de l'application
// Il centralise toutes les données que l'on veut partager entre les composants.
const store = configureStore({
  reducer: {
    // On définit une tranche (slice) d'état nommée 'auth'
    // Elle sera gérée par le authReducer que nous avons créé
    auth: authReducer, 
  },
});

// On exporte le store pour qu'il puisse être utilisé par le composant <Provider> dans index.js
export default store;
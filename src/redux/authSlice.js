import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({ // On crée une slice pour l'authentification et les données de profil utilisateur //
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    // Ajout des données de profil de l'utilisateur
    userProfile: {
      userName: '',
      firstName: '',
      lastName: '',
    }
  },
  reducers: {
    // Action pour stocker le token et mettre à jour l'état de connexion//
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    // Nouvelle action pour stocker les infos de l'utilisateur récupérées depuis l'API
    setProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    // Nouvelle action pour mettre à jour uniquement le username
    updateUsernameSuccess: (state, action) => {
      state.userProfile.userName = action.payload;
    },
    // Action pour gérer la déconnexion : on vide le token, on réinitialise l'état de connexion et les infos de profil//
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userProfile = { userName: '', firstName: '', lastName: '' };
    },
  },
});

export const { loginSuccess, setProfile, updateUsernameSuccess, logout } = authSlice.actions;
// On exporte le reducer pour l'intégrer dans le store Redux//
export default authSlice.reducer;
// Note : Les actions setProfile et updateUsernameSuccess sont utilisées pour mettre à jour les données de profil dans le store Redux, //
// ce qui permet à l'application de refléter les changements d'informations utilisateur en temps réel.//
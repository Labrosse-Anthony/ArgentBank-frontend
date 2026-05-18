import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
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
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userProfile = { userName: '', firstName: '', lastName: '' };
    },
  },
});

export const { loginSuccess, setProfile, updateUsernameSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
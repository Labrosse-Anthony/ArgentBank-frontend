import { createSlice } from '@reduxjs/toolkit';

// Le Slice gère une partie précise du state global (ici l'authentification).
const authSlice = createSlice({
  name: 'auth', // Nom du slice utilisé dans les actions
  initialState: {
    token: null, // Stockera le token JWT récupéré via l'API
    isAuthenticated: false, // Permet de savoir rapidement si l'utilisateur est loggé
  },
  reducers: {
    // loginSuccess est appelée quand l'API renvoie une réponse positive. action.payload contiendra le token.
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    //logout permet de réinitialiser le state lors de la déconnexion.
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// On exporte les actions pour pouvoir les appeler (dispatch) depuis les composants
export const { loginSuccess, logout } = authSlice.actions;

// On exporte le reducer pour l'enregistrer dans le store
export default authSlice.reducer;
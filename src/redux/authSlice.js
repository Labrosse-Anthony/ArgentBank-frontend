import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
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

    setProfile: (state, action) => {
      state.userProfile = action.payload;
    },

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

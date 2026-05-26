import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Imports spécifiques à Redux Persist
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilise le localStorage par défaut

// Configuration de la sauvegarde
const persistConfig = {
  key: 'root',
  storage,
};

// On combine nos reducers (utile si tu en as plusieurs plus tard)
const rootReducer = combineReducers({
  auth: authReducer,
});

// On crée un reducer "persistant"
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // Middleware requis par Redux Toolkit pour éviter les erreurs dans la console avec Redux Persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Le Provider rend le store Redux disponible pour tous les composants de l'application qui sont connectés à Redux. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

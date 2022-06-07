import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {UserProvider } from './contexts/UserContext';
import { MaterialsProvider } from './contexts/MaterialsContext';
import {FavoritesAuthorsProvider} from "./contexts/FavoritesAuthorsContext";

import './index.css';
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
        <MaterialsProvider>
            <FavoritesAuthorsProvider>
                <App />
            </FavoritesAuthorsProvider>
        </MaterialsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

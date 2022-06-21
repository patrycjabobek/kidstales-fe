import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {UserProvider } from './contexts/UserContext';
import { CategoriesProvider } from './contexts/CategoriesContext';
import {FavoritesAuthorsProvider} from "./contexts/FavoritesAuthorsContext";

import './index.css';
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
        <CategoriesProvider>
            <FavoritesAuthorsProvider>
                <App />
            </FavoritesAuthorsProvider>
        </CategoriesProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

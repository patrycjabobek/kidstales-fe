import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {UserProvider } from './contexts/UserContext';
import { MaterialsProvider } from './contexts/MaterialsContext';

import './index.css';
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
        <MaterialsProvider>
            <App />
        </MaterialsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

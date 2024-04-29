import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
          <BrowserRouter>
             <App />
          </BrowserRouter>
      </PersistGate>
  </Provider>
)

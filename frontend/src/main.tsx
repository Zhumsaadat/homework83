import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <PersistGate persistor={persistor}>
          <BrowserRouter>
             <App />
          </BrowserRouter>
      </PersistGate>
    </GoogleOAuthProvider>
  </Provider>
);

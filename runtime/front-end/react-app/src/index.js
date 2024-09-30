import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "https://sso.dev.local/realms/Liferay",
  client_id: "liferay",
  redirect_uri: window.location.origin + '/callback',
  //redirect_uri: window.location.origin,


  post_logout_redirect_uri: window.location.origin,
  response_type: 'code', // Utilisation du flux d'authentification code (PKCE)
  scope: 'openid profile email', // Scopes demandés lors de l'authentification
  automaticSilentRenew: true, // Renouvellement automatique du token en arrière-plan
  loadUserInfo: true, // Charger les informations supplémentaires de l'utilisateur après l'authentification
  silent_redirect_uri: window.location.origin + '/silent-renew', // URL pour le renouvellement silencieux du token
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

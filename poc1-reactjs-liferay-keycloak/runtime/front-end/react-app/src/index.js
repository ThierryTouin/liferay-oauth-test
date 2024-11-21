import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "react-oidc-context";
import Sample from "./components/Sample.js";


const oidcConfig = {
  authority: "https://sso.dev.local/realms/Liferay",
  client_id: "liferay",
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: window.location.origin,
  response_type: 'code', // Use of the code authentication flow (PKCE)
  scope: 'openid profile email', // Scopes requested during authentication
  automaticSilentRenew: true, // Automatic token renewal in the background
  loadUserInfo: true, // Load additional user information after authentication
  silent_redirect_uri: window.location.origin + '/silent-renew', // URL for silent token renewal
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <h1>APP1 from POC1</h1>
      <Sample/>
    </AuthProvider>,

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

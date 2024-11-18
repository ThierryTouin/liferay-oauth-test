//import logo from './logo.svg';
import './App.css';
import { AuthProvider } from "react-oidc-context";
import Sample from "./components/Sample.js";
import PrivateRoute from "./config/auth/PrivateRoute.js";

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


function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <PrivateRoute/> 
      <h1>APP2 from POC2</h1>
      <Sample/>
    </AuthProvider>
  );
}

export default App;

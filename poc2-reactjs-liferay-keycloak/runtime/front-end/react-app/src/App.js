import './App.css';
import { AuthProvider } from "react-oidc-context";
import AppRoutes from "./components/routes/AppRoutes";

const defaultURL = window.location.origin + window.location.pathname;

const oidcConfig = {
  authority: "https://sso.dev.local/realms/Liferay",
  client_id: "liferay",
  redirect_uri: defaultURL,
  post_logout_redirect_uri: defaultURL,
  response_type: 'code', // Use of the code authentication flow (PKCE)
  scope: 'openid profile email', // Scopes requested during authentication
  automaticSilentRenew: true, // Automatic token renewal in the background
  loadUserInfo: true, // Load additional user information after authentication
  silent_redirect_uri: window.location.origin + window.location.pathname + '#silent-renew', // URL for silent token renewal (using hashrouter)
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};


function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

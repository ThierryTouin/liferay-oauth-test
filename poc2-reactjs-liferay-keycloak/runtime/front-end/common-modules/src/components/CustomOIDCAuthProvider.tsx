import React, { ReactNode } from 'react';
import { AuthProvider } from 'react-oidc-context';

// Définir l'URL de base par défaut
const defaultURL: string = window.location.origin + window.location.pathname;

// Configuration OIDC
const oidcConfig = {
  authority: "https://sso.dev.local/realms/Liferay",
  client_id: "liferay",
  redirect_uri: defaultURL,
  post_logout_redirect_uri: defaultURL + '#logout',
  response_type: 'code', // Utilisation du flow d'authentification code (PKCE)
  scope: 'openid profile email', // Scopes demandés pendant l'authentification
  automaticSilentRenew: true, // Renouvellement automatique du token en arrière-plan
  loadUserInfo: true, // Charger des informations supplémentaires sur l'utilisateur après l'authentification
  silent_redirect_uri: window.location.origin + window.location.pathname + '#silent-renew', // URL pour le renouvellement silencieux du token
  onSigninCallback: (): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

// Typage des props de CustomOIDCAuthProvider
export interface CustomOIDCAuthProviderProps {
  children: ReactNode;
}

/**
 * Custom OIDC Auth Provider
 * Encapsule le AuthProvider de react-oidc-context et fournit une configuration centralisée.
 */
export const CustomOIDCAuthProvider: React.FC<CustomOIDCAuthProviderProps> = ({ children }) => {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
};

export default CustomOIDCAuthProvider;


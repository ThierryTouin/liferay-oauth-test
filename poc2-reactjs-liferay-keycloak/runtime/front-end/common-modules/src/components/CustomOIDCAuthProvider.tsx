import React, { ReactNode } from 'react';
import { AuthProvider } from 'react-oidc-context';
import { getAuthConfiguration } from '../services/authProviderConfigService';
import { CustomOIDCAuthProviderProps } from '../models/CustomOIDCAuthProviderProps';

// Définir l'URL de base par défaut
const defaultURL: string = window.location.origin + window.location.pathname;

/**
 * Custom OIDC Auth Provider
 * Encapsule le AuthProvider de react-oidc-context et fournit une configuration centralisée.
 */
export const CustomOIDCAuthProvider: React.FC<CustomOIDCAuthProviderProps> = ({ appId, children }) => {

  const oidcConfig = getAuthConfiguration(appId);

  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
};

export default CustomOIDCAuthProvider;


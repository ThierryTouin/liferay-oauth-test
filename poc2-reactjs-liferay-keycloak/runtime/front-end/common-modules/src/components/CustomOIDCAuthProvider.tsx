import React from 'react';
import { AuthProvider } from 'react-oidc-context';
import { getAuthConfiguration } from '../services/configService';
import { CustomOIDCAuthProviderProps } from '../models/CustomOIDCAuthProviderProps';

/**
 * Custom OIDC Auth Provider
 * Encapsule le AuthProvider de react-oidc-context et fournit une configuration centralisée.
 */
export const CustomOIDCAuthProvider: React.FC<CustomOIDCAuthProviderProps> = ({ appId, children }) => {

  const oidcConfig = getAuthConfiguration(appId);

  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
};

export default CustomOIDCAuthProvider;


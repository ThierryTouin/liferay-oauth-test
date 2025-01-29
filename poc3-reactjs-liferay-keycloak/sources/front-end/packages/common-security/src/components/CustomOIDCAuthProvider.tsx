import React from 'react';
import { AuthProvider } from 'react-oidc-context';
import { getAuthConfiguration } from '../services/configService';
import { CustomOIDCAuthProviderProps } from '../models/CustomOIDCAuthProviderProps';
import { AppConfiguration } from '../models/AppConfiguration';
import { useAppContext } from "./context/AppContext"; 

/**
 * Custom OIDC Auth Provider
 * Encapsule le AuthProvider de react-oidc-context et fournit une configuration centralisée.
 */
export const CustomOIDCAuthProvider: React.FC<CustomOIDCAuthProviderProps> = ({ children }) => {

  const context: AppConfiguration = useAppContext();

  const appId: string = context.appId;

  const oidcConfig = getAuthConfiguration(appId);

  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
};

export default CustomOIDCAuthProvider;
import { UserManagerSettings, InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';
import { AppConfiguration } from '../models/AppConfiguration';
import { ProvidedAppConfiguration } from '../models/ProvidedAppConfiguration';

export function getAuthConfiguration(appId: string): UserManagerSettings {

  const defaultURL: string = window.location.origin + window.location.pathname;

  const baseAuthProviderConfig: UserManagerSettings = {
    authority: "https://sso.dev.local/realms/Liferay",
    client_id: "liferay",
    redirect_uri: defaultURL,
    post_logout_redirect_uri: defaultURL,
    response_type: 'code', // Use of the code authentication flow (PKCE)
    scope: 'openid profile email', // Scopes requested during authentication
    automaticSilentRenew: true, // Automatic token renewal in the background
    loadUserInfo: true, // Load additional user information after authentication
    silent_redirect_uri: defaultURL + '#silent-renew', // URL for silent token renewal (using hashrouter)
    userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }) // Stockage uniquement en mémoire
  };

  if (!appId || appId.trim() === "") {
    throw new Error("The parameter 'appId' is required and cannot be empty.");
  }

  // Generate the silent redirect URI dynamically
  const silentRedirectUri = defaultURL + '#silent-renew-' + appId;

  // Return the full configuration object
  return {
    ...baseAuthProviderConfig, // Spread the base configuration
    silent_redirect_uri: silentRedirectUri, // Override silent_redirect_uri
  };
}

export function buildAppConfiguration(providedConfig: ProvidedAppConfiguration, appCustomConfig?: any): AppConfiguration {

  if (!providedConfig || typeof providedConfig !== "object") {
    throw new Error("The parameter 'config' is required and cannot be empty.");
  }

  const appConfig: AppConfiguration = {
    ...providedConfig,
    appCustomConfig: appCustomConfig,
  };

  console.debug('Return merged configuration : ' + JSON.stringify(appConfig, null, 2));

  return appConfig;
}

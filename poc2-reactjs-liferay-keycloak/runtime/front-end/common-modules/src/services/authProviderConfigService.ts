import { UserManagerSettings } from 'oidc-client';

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
};

export function getAuthConfiguration(appId: string) {

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

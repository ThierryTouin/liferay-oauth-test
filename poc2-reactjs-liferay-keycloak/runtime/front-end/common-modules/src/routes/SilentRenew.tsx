import React, { useEffect } from 'react';
import { UserManager } from 'oidc-client';
import { getAuthConfiguration } from '../services/authProviderConfigService';

export interface LocalSilentRenewProps {
  appId: string; // Déclare le type de la prop
}

// Define the SilentRenew component
export const SilentRenew: React.FC<LocalSilentRenewProps> = ({ appId }) => {

  const authProviderConfig = getAuthConfiguration(appId);

  const userManager = new UserManager(authProviderConfig);

  useEffect(() => {
    // Function to handle the silent renewal process
    const handleSilentRenew = async () => {

      console.log("Inside COMMON MODULES ...");
      try {
        // Call the callback to handle the silent renew response
        await userManager.signinSilentCallback();
        console.log("Silent renew completed successfully.");
      } catch (error) {
        // Handle any errors that occur during the silent renew process
        console.error("Silent renew failed", error);
      }

    };

    // Trigger the silent renew process when the component mounts
    handleSilentRenew();
  }, [userManager]);

  return <div>Renewing session...</div>; // Render a loading message while renewing the session
};

import React from "react";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

// Define the functional component with TypeScript typing
const SilentRenew: React.FC = () => {
  const { signinSilent } = useAuth();

  useEffect(() => {
    const handleSilentRenew = async () => {
      try {
        // Call the callback to handle the silent renewal response
        await signinSilent();
        console.log("Silent renew completed successfully.");
      } catch (error) {
        console.error("Silent renew failed", error);
      }
    };

    handleSilentRenew();
  }, [signinSilent]);

  return <div>Renewing session...</div>;
};

export default SilentRenew;

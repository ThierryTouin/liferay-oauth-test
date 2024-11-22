import React from "react";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const SilentRenew = () => {
  const { signinSilentCallback } = useAuth();

  useEffect(() => {
    const handleSilentRenew = async () => {
      try {
        // Appeler la callback pour gérer la réponse du renouvellement silencieux
        await signinSilentCallback();
        console.log("Silent renew completed successfully.");
      } catch (error) {
        console.error("Silent renew failed", error);
      }
    };

    handleSilentRenew();
  }, [signinSilentCallback]);

  return <div>Renewing session...</div>;
};

export default SilentRenew;
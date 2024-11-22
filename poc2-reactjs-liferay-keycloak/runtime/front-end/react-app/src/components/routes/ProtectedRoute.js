
import React, { useEffect, useRef } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth, hasAuthParams } from "react-oidc-context";
import { Portal } from "../../services/common/Portal";

const ProtectedRoute = ({ children }) => {
  const oidc = useAuth();

  // Use a ref to track if a sign-in attempt has been made
  const hasTriedSignin = useRef(false);

  useEffect(() => {
    const tryAuthentication = async () => {
      // Check if running inside Liferay or standalone
      const isInPortal = Portal.isInPortal();
      const isPortalSignedIn = Portal.isPortalSignedIn();

      console.log(`APP 1 is running in ${isInPortal ? "Liferay" : "standalone"} mode`);

      if (
        !hasAuthParams() && // No authentication params in URL
        !oidc.isAuthenticated && // User is not authenticated
        !oidc.activeNavigator && // No ongoing OIDC operation
        !oidc.isLoading && // Not currently loading
        !hasTriedSignin.current // No prior sign-in attempt
      ) {
       
        hasTriedSignin.current = true;
        try {
          if (isInPortal) {

            if (isPortalSignedIn) {
              // Silent sign-in for Liferay environment
              console.log("Attempting silent authentication...");
              await oidc.signinSilent();
            } else {
              console.log("Skipping silent redirect...");
              return <Navigate to="/portal-login" replace />;
            }

          } else {
            // Redirect-based sign-in for standalone mode
            console.log("Redirecting to signin...");
            await oidc.signinRedirect();
          }
        } catch (error) {
          console.error("Authentication failed:", error);
        }
      }
    };

    tryAuthentication();
    
  }, [oidc]);

  // Render loading state during authentication process
  if (oidc.isLoading) {
    return <div>Signing you in/out...</div>;
  }

  // Redirect to home if not authenticated
  if (!oidc.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;

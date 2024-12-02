
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth, hasAuthParams } from "react-oidc-context";
import { Portal } from "../services/common/Portal";

const ProtectedRoute = ({ children }) => {
  const oidc = useAuth();

  // Use a ref to track if a sign-in attempt has been made
  const hasTriedSignin = useRef(false);

  // Using useEffect to force component rerendering
  const [isRedirectingPortalLogin, setIsRedirectingPortalLogin] = useState(false);

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
  
        if (isInPortal) {

          if (isPortalSignedIn) {
            // Silent sign-in for Liferay environment
            console.log("Attempting silent authentication...");
            await oidc.signinSilent();
          } else {
            console.log("Skipping silent redirect...");
            setIsRedirectingPortalLogin(true);
          }

        } else {
          // Redirect-based sign-in for standalone mode
          console.log("Redirecting to signin...");
          await oidc.signinRedirect();
        }
      }
    };

    tryAuthentication();
    
  }, [oidc]);

  if (isRedirectingPortalLogin) {
    return <Navigate to="/portal-login" replace />;
  }

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

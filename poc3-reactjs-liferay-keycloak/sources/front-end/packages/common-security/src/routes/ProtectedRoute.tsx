import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { hasAuthParams } from 'react-oidc-context';
import { ErrorMessage } from '../routes/ErrorMessage';
import { ProtectedRouteProps } from '../models/ProtectedRouteProps'

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, oidc }) => {

  // Ref to track if a sign-in attempt has been made
  const hasTriedSignin = useRef<boolean>(false);

  // State to handle redirection and authentication errors
  const [isRedirectingPortalLogin, setIsRedirectingPortalLogin] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const tryAuthentication = async () => {
      
      //FIXME: This is a temporary workaround because Portal is not yet supported
      const isInPortal = false;
      const isPortalSignedIn = false;
    
      // Only attempt to authenticate if no auth params, not authenticated, and no ongoing OIDC operation
      if (
        !hasAuthParams() &&
        !oidc.isAuthenticated &&
        !oidc.activeNavigator &&
        !oidc.isLoading &&
        !hasTriedSignin.current
      ) {
        hasTriedSignin.current = true;

        try {
          console.log(`APP 2 is running in ${isInPortal ? "Liferay" : "standalone"} mode`);
          if (isInPortal) {
            if (isPortalSignedIn) {
              // Attempt silent authentication for Liferay
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
        } catch (error) {
          console.error("Authentication failed:", error);
          setAuthError("An error occurred while trying to authenticate. Please try again.");
        }
      }
    };

    tryAuthentication();
  }, [oidc]);

  if (oidc.error) {
    return <ErrorMessage message={oidc.error.message} />;
  }

  // Show error message if authentication fails
  if (authError) {
    return <ErrorMessage message={authError} />;
  }

  // Redirect to the portal login page if necessary
  if (isRedirectingPortalLogin) {
    return <Navigate to="/portal-login" replace />;
  }

  // Show loading state while authentication is in progress
  if (oidc.isLoading) {
    return <div>Signing you in...</div>;
  }

  // Redirect to home if the user is not authenticated
  if (!oidc.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render children if the user is authenticated
  return <>{children}</>;
};

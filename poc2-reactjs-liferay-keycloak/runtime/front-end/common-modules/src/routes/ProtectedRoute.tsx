import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, hasAuthParams } from "react-oidc-context"; 
//@ts-ignore
import { Portal } from "./utils/Portal";

// Define prop types for the component, indicating that children will be React elements.
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Retrieve OIDC context using the `useAuth` hook
  const oidc = useAuth();

  // Use a ref to track if a sign-in attempt has been made
  const hasTriedSignin = useRef(false);

  // State to manage redirection during portal login
  const [isRedirectingPortalLogin, setIsRedirectingPortalLogin] = useState(false);

  useEffect(() => {
    const tryAuthentication = async () => {
      const isInPortal = Portal.isInPortal();
      const isPortalSignedIn = Portal.isPortalSignedIn();
      console.log(`APP 1 is running in ${isInPortal ? "Liferay" : "standalone"} mode`);

      if (
        !hasAuthParams() &&
        !oidc.isAuthenticated &&
        !oidc.activeNavigator &&
        !oidc.isLoading &&
        !hasTriedSignin.current
      ) {
        hasTriedSignin.current = true;
        try {
          if (isInPortal) {
            if (isPortalSignedIn) {
              console.log("Attempting silent authentication...");
              await oidc.signinSilent();
            } else {
              console.log("Skipping silent redirect...");
              setIsRedirectingPortalLogin(true);
            }
          } else {
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

  // Redirect to the portal login page if necessary
  if (isRedirectingPortalLogin) {
    return <Navigate to="/portal-login" replace />;
  }

  // Show loading state during authentication process
  if (oidc.isLoading) {
    return <div>Signing you in/out...</div>;
  }

  // If the user is not authenticated, redirect to the home page
  if (!oidc.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the children (protected content)
  return <>{children}</>;
};

export default ProtectedRoute;

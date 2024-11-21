
import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth, hasAuthParams } from "react-oidc-context";

const ProtectedRoute = ({ children }) => {
  const oidc = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = React.useState(false);

  /*useEffect(() => {
    const trySilentAuthentication = async () => {
      if (!oidc.isAuthenticated) {
        try {
          // Tente de récupérer un token silencieusement
          await oidc.signinSilent();
          console.log("Silent authentication succeeded");
        } catch (error) {
          console.error("Silent authentication failed:", error);
        }
      }
    };

    if (!oidc.isLoading) {
      trySilentAuthentication();
    }
  }, [oidc]);

  if (oidc.isLoading) {
    return <div>Loading...</div>; // Affiche un loader pendant le chargement
  }

  if (!oidc.isAuthenticated) {
    return <div>User is not connected</div>;
  } else {
    // Si authentifié, affiche les enfants (le contenu protégé)
    return children;
  }*/

   useEffect(() => {
    const tryAuthentication = async () => {
        if (!hasAuthParams() &&
            !oidc.isAuthenticated && !oidc.activeNavigator && !oidc.isLoading &&
            !hasTriedSignin
        ) {
          console.log("Redirecting to signin ...")
          setHasTriedSignin(true);
          await oidc.signinRedirect();
        }
    };

    if (!oidc.isLoading && !oidc.isAuthenticated && !hasTriedSignin) {
      tryAuthentication();
    }

  }, [oidc, hasTriedSignin]);


  if (oidc.isLoading) {
    return <div>Signing you in/out...</div>;
  }

  if (!oidc.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (oidc.isAuthenticated) {
    return children;
  }

};

export default ProtectedRoute;

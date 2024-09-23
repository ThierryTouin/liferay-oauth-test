// Code for defining a PrivateRoute component for protecting routes based on authentication status.
import React from 'react';
import { useAuth } from 'react-oidc-context';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>;
    case 'signoutRedirect':
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    // <div>Loading...</div>;
    return <div></div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }
  if (!auth.isAuthenticated) {
    let originPath = window.location.pathname;
    auth.signinRedirect({
      //redirect_uri: process.env.REACT_APP_PROJECT_URL.concat(originPath),
      //redirect_uri: 'http://app1.dev.local:3000'.concat(originPath),
      redirect_uri: 'http://localhost:3000'.concat(originPath),
    });
  }

  if (auth.isAuthenticated) {
    window.history.replaceState({}, document.title, window.location.pathname);
    return <>{children}</>;
  }
};

export default PrivateRoute;

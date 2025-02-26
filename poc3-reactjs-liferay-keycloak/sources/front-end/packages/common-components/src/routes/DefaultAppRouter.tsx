import React from 'react';
import { CustomRouteProps } from '../models/CustomRouteProps';
import { NotFound } from './NotFound';
import { ExternalLogin } from './ExternalLogin';
import { SilentRenew } from './SilentRenew';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth, AuthContextProps } from 'react-oidc-context';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultAppRouterProps } from '../models/DefaultAppRouterProps';
import { AppConfiguration } from '../models/AppConfiguration';
import { useAppContext } from "../context/AppContext"; 

export const DefaultAppRouter: React.FC<DefaultAppRouterProps> = ({ appId, appRoutes }) => {

  const oidc: AuthContextProps = useAuth();

  const context: AppConfiguration = useAppContext();
  const embedded: boolean = context.embedded;
  const signInSilently: boolean = context.signInSilently;

  return (
    <Router>
      <Routes>
        {/* Render the first route as the default ("/"), or fallback to NotFound */}
        {appRoutes.length > 0 ? (
          appRoutes.map((route: CustomRouteProps, index: number) => (
            <Route
              key={index}
              path={index === 0 ? "/" : route.path} // Use "/" for the first route
              element={
                route.protected ? (
                  <ProtectedRoute oidc={oidc} embedded={embedded} signInSilently={signInSilently}>{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            />
          ))
        ) : (
          // Fallback route if appRoutes is empty
          <Route path="/" element={<NotFound />} />
        )}

        {/* Portal login route */}
        <Route path="/portal-login" element={<ExternalLogin />} />

        {/* Silent renew route */}
        <Route path="/silent-renew" element={<SilentRenew appId={appId}/>} />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default DefaultAppRouter;
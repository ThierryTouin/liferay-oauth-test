import React from 'react';
import Home from '../components/Home';
import { NotFound, CustomRouteProps, ExternalLogin, SilentRenew } from 'common-modules';
import LocalProtectedRoute from '../routes/LocalProtectedRoute';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const appRoutes: CustomRouteProps[] = [
  { path: "/home", element: <Home />, protected: true },
];

interface AppRouterProps {
  appId: string;
}

const AppRouter: React.FC<AppRouterProps> = ({ appId }) => {

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
                  <LocalProtectedRoute>{route.element}</LocalProtectedRoute>
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

export default AppRouter;
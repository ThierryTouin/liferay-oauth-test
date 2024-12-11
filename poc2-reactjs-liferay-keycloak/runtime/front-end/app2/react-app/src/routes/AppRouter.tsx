import React from 'react';
import Home from '../components/Home';
import { CustomRouteProps, DefaultAppRouter } from 'common-modules';
import { AppRouterProps } from '../models/AppRouterProps';

const AppRouter: React.FC<AppRouterProps> = ({ appId }) => {

  const appRoutes: CustomRouteProps[] = [
    { path: "/home", element: <Home />, protected: true },
  ];

  return (
    <DefaultAppRouter appRoutes={appRoutes} appId={appId} />
  );
};

export default AppRouter;
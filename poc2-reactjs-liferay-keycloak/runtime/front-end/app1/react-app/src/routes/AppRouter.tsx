import React from 'react';
import { DebugDataDisplay } from '../components/DebugDataDisplay';
import { CustomRouteProps, DefaultAppRouter } from 'common-modules';
import { AppRouterProps } from '../models/AppRouterProps';

const AppRouter: React.FC<AppRouterProps> = ({ appId }) => {

  const appRoutes: CustomRouteProps[] = [
    { path: "/home", element: <DebugDataDisplay appId={appId}/>, protected: true },
  ];

  return (
    <DefaultAppRouter appRoutes={appRoutes} appId={appId} />
  );
};

export default AppRouter;
import React from 'react';
import PrivatePage from './PrivatePage';
import PublicPage from './PublicPage';
import { CustomRouteProps, DefaultAppRouter, AppConfiguration, useAppContext } from 'common-security';
import { AppRouterProps } from '../models/AppRouterProps';

const AppRouter: React.FC<AppRouterProps> = () => {

  const context: AppConfiguration = useAppContext();
  const appId: string = context.appId;

  const appRoutes: CustomRouteProps[] = [
    { path: "/home", element: <PublicPage/>, protected: false },
    { path: "/dashboard", element: <PrivatePage/>, protected: true }
  ];

  return (
    <div>
      <h1>APP Description</h1>
      <p>Todo description </p>
      <DefaultAppRouter appRoutes={appRoutes} appId={appId} />
    </div>
  );
};

export default AppRouter;
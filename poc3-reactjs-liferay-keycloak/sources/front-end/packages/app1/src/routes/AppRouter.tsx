import React from 'react';
import PrivatePage from './PrivatePage';
import PublicPage from './PublicPage';
import { CustomRouteProps, DefaultAppRouter, AppConfiguration, useAppContext } from 'common-components';
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
      <h2>APP 01 Description</h2>
      <ul>
        <li>This application obtains an AccessToken using Authorization Code Flow with PKCE.</li>
        <li>To improve security, this application does not store tokens in local or session storage</li>
        <li>This app uses common components stored in a library</li>
      </ul>
      <DefaultAppRouter appRoutes={appRoutes} appId={appId} />
    </div>
  );
};

export default AppRouter;
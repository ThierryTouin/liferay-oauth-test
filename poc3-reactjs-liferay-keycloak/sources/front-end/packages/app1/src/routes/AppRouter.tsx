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
      <h1>APP 01 Description</h1>
      <p> <b>TODO :</b> </p>
      <ul>
        <li>Manage react-oidc-context to not store token in local storage</li>
        <li>Fixe use indefined in private pages</li>
        <li>Poc passing secured and less secure parameters</li>
        <li>Used style components in other non styled components</li>
      </ul>
      <DefaultAppRouter appRoutes={appRoutes} appId={appId} />
    </div>
  );
};

export default AppRouter;
import React from 'react';
import PrivatePage from './PrivatePage';
import PublicPage from './PublicPage';
import { CustomRouteProps } from '../models/CustomRouteProps';
import { DefaultAppRouter } from '../routes/DefaultAppRouter';
import { AppConfiguration } from '../models/AppConfiguration';
import { useAppContext } from '../components/context/AppContext';
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
      <p> <b>TODO :</b> </p>
      <ul>
        <li>Manage react-oidc-context to not store token in local storage</li>
        <li>Fixe use undefined in private pages</li>
        <li>Poc passing secured and less secure parameters</li>
        <li>Used style components in other non styled components</li>
      </ul>
      <DefaultAppRouter appRoutes={appRoutes} appId={appId} />
    </div>
  );
};

export default AppRouter;
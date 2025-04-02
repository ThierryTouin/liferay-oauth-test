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
      <h3>APP 01 Description</h3>
      <ul>
        <li>
          <b>AUTHENTICATION:</b>
          <ul>
            <li>This application obtains an AccessToken using Authorization Code Flow with PKCE (silent_mode when embedded in Liferay and redirect if not).</li>
            <li>To improve security, this application does not store tokens in local or session storage. (RAM storage)</li>
           </ul>
        </li>
        <li>
          <b>INTEGRATION :</b>
          <ul>
            <li>Defined as web component</li>
            <li>This application is deployed <b>in separate resource server hosted outside of Liferay</b> portal with <b>limited adherence</b> with Liferay.</li> 
            <li>This application <b>is integrated in Liferay as remote app</b> using pure OSGI config (without declared client-extension in Liferay workspace)</li>
          </ul>
        </li>
        <li>
          <b>MISCELLANEOUS :</b>
          <ul>
            <li>This app implements complete routing example (private & public pages)</li>
            <li>This app leverage a <b>centralized and shared react library</b> to centralize common devs or libraries.</li>
            <li>This app include App2 code as a web component in private part. <b>App2 inclusion doesn't work in dev mode because of unavailability of required proxy</b></li>
          </ul>
        </li>        
      </ul>
      <DefaultAppRouter appRoutes={appRoutes} appId={appId} />
    </div>
  );
};

export default AppRouter;
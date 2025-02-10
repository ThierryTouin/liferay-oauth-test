import React from 'react';
import { DebugDataDisplay } from '../components/DebugDataDisplay';
import { CustomRouteProps, DefaultAppRouter, AppConfiguration, useAppContext } from 'common-components';
import { AppRouterProps } from '../models/AppRouterProps';

const AppRouter: React.FC<AppRouterProps> = () => {

  const context: AppConfiguration = useAppContext();
  const appId: string = context.appId;

  const appRoutes: CustomRouteProps[] = [
    { path: "/home", element: <DebugDataDisplay appId={appId}/>, protected: true },
  ];

  return (
    <div>
      <h3>APP Description</h3>
      <p>This React app is Private : it leverage : </p>
      <ul>
      <li><b>Sso</b> to authentify using Open Id Connect procotole in <b>silent mode</b>.</li>
      <li><b>Apim</b> to grant securised access to Back End API.</li>
      </ul>   
      <p>
      This application is deployed <b>in separate resource server hosted outside of Liferay</b> portal with <b>limited adherence</b> with Liferay. 
      This app leverage a <b>centralized and shared react library</b> to centralize common devs. This application <b>is integrated in Liferay as remote app</b> using pure OSGI config 
      (without declared client-extension in Liferay workspace)</p>
      <DefaultAppRouter appRoutes={appRoutes} appId={appId} />
    </div>
  );
};

export default AppRouter;
import React from 'react';
import Home from '../components/Home';
import { CustomRouteProps, DefaultAppRouter } from 'common-modules';
import { AppRouterProps } from '../models/AppRouterProps';

const AppRouter: React.FC<AppRouterProps> = ({ appId }) => {

  const appRoutes: CustomRouteProps[] = [
    { path: "/home", element: <Home />, protected: true },
  ];

  return (
    <div>
      <h3>APP Description</h3>
      <p>This React app is Private : it leverage : 
        <ul>
          <li><b>Sso</b> to authentify using Open Id Connect procotole in <b>silent mode</b>.</li>
        </ul>   
      This application is deployed <b>in separate container hosted outside of Liferay</b> portal with <b>limited adherence</b> with Liferay. 
      This app leverage a <b>centralized and shared react library</b> to centralize common devs. This application <b>is integrated in Liferay as remote app</b> using pure OSGI config 
      (without declared client-extension in Liferay workspace)</p>
       
      <DefaultAppRouter appRoutes={appRoutes} appId={appId} />
    </div>
  );
};

export default AppRouter;
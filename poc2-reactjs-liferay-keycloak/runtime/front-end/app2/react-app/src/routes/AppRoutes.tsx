import React from 'react';
import Home from '../components/Home';
import { DefaultRoutes } from 'common-modules';

const appRoutes = [
  { path: "/home", element: <Home /> },
];

const AppRoutes: React.FC = () => {
  return <DefaultRoutes routes={appRoutes} />;
};

export default AppRoutes;


import React from 'react';
import Home from '../components/Home';
import { NotFound, CustomRouteProps } from 'common-modules';
import { HashRouter as Router, Routes, Route} from "react-router-dom";

const appRoutes: CustomRouteProps[] = [
  { path: "/home", element: <Home />, protected: false, },
];

const firstElement: CustomRouteProps =  appRoutes[0];

const AppRouter: React.FC = () => {

  return (
    <Router>
      <Routes>
        {/* Define the default route */}
        <Route path="/" element={firstElement.element} />

       {/* Boucle à travers les autres routes et les afficher */}
       {appRoutes.map((route: CustomRouteProps, index:number) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected ? (
                //TODO JDA : remove this
                route.element//<ProtectedRoute element={route.element} />
              ) : (
                route.element
              )
            }
          />
        ))}

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;


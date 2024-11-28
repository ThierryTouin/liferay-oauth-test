import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CustomRouteProps from "../types/CustomRouteProps";

const DefaultRoutes: React.FC<CustomRouteProps> = ({ routes }) => {
  // Check if 'routes' is not undefined and contains at least one element
  if (!routes || routes.length === 0) {
    // If routes is empty or undefined, return NotFound page
    return <NotFound />;
  }

  return (
    <Router>
      <Routes>
        {/* Define the default route */}
        <Route path="/" element={routes[0].element} />

        {/* Map through other routes and render them */}
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default DefaultRoutes;



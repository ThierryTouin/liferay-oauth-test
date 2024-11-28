import React from "react";
import SilentRenew from "./SilentRenew";
import CustomRouteProps from "../types/CustomRouteProps";
import DefaultRoutes from "./DefaultRoutes";


// Define the routes array
const protectedRoutes = [
  { path: "/silent-renew", element: <SilentRenew /> },
  // Add other protected routes here if needed
];

const DefaultProtectedRoutes: React.FC<CustomRouteProps> = ({ routes }) => {

  const mergedArray = [
    ...protectedRoutes,
    ...routes.filter(route => !protectedRoutes.some(r => r.path === route.path))
  ];

  return (<DefaultRoutes routes={mergedArray} />);
};

export default DefaultProtectedRoutes;
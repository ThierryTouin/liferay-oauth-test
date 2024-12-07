import React from "react";
// Important to use HashRouter in Liferay context
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Display from "../components/Display";
import ProtectedRoute from "./ProtectedRoute";
import SilentRenew from "./SilentRenew";
import NotFound from "./NotFound";
import PortalLogin from "./PortalLogin";
import Logout from "./Logout";

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Default protected route */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Display />
          </ProtectedRoute>
        } 
      />

      {/* Portal login route */}
      <Route path="/portal-login" element={<PortalLogin />} />
      
      {/* Silent renew route */}
      <Route path="/silent-renew" element={<SilentRenew />} />

      {/* Logout route */}
      <Route path="/logout" element={<Logout />} />
      
      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;
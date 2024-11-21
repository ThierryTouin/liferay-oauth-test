import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Display from "../Display";
import ProtectedRoute from "./ProtectedRoute";
import SilentRenew from "./SilentRenew";
import NotFound from "./NotFound";

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
      
      {/* Silent renew route */}
      <Route path="/silent-renew" element={<SilentRenew />} />
      
      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import SilentRenew from "./SilentRenew";
import { DefaultRoutes } from "..";

// If you're planning to pass any props in the future, define them in a Props interface
interface DefaultProtectedRoutesProps {}

const DefaultProtectedRoutes: React.FC<DefaultProtectedRoutesProps> = () => (
  <Router>
    <Routes>
      {/* Silent renew route */}
      <Route path="/silent-renew" element={<SilentRenew />} />
      
      {/* Fallback route */}
      <Route path="*" element={<DefaultRoutes />} />
    </Routes>
  </Router>
);

export default DefaultProtectedRoutes;

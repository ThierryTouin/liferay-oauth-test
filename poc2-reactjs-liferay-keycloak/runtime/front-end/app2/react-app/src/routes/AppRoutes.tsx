import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// Don't forget to add types in common-modules.d.ts to make import qork as expected
import { DefaultRoutes } from "common-modules";
import Home from "../components/Home";

// If you're planning to pass any props in the future, define them in a Props interface
interface AppRoutesProps {}

const AppRoutes: React.FC<AppRoutesProps> = () => (
  <Router>
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Fallback route */}
      <Route path="*" element={<DefaultRoutes />} />
    </Routes>
  </Router>
);

export default AppRoutes;

import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

// If you're planning to pass any props in the future, define them in a Props interface
interface DefaultRoutesProps {}

const DefaultRoutes: React.FC<DefaultRoutesProps> = () => (
  <Router>
    <Routes>
      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default DefaultRoutes;

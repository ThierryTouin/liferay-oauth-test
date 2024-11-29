import React from "react";
import "../styles/route-style.css";

// No props for this component, so we use React.FC with no props.
export const NotFound: React.FC = () => (
  <div className="container">
    <h2 className="heading">404</h2>
    <p className="paragraph">
      Oops! The page you are looking for does not exist.
    </p>
  </div>
);
import React from "react";
// See apps webpack config to find common-images alias definition
import reactlogo from '../shared/images/react-logo.png';
import "../styles/react-logo.css";

interface ReactLogoProps {
  
}

export const ReactLogo: React.FC<ReactLogoProps> = () => {
  return (
    <div className="logo-container">
      <img
        src={ reactlogo }
        alt="React Logo"
      />
    </div>
  );
};
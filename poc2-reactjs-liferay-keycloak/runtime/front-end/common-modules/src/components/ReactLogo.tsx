import React from "react";
import "../styles/react-logo.css";

interface ReactLogoProps {
  imageUrl:string;
}

export const ReactLogo: React.FC<ReactLogoProps> = ({ imageUrl }) => {
  return (
    <div className="logo-container">
      <img
        src={`${imageUrl}/react-logo.png`}
        alt="React Logo"
      />
    </div>
  );
};
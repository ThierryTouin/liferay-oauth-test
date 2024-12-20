
import React from "react";
import "../styles/header.css";
import { ReactLogo } from "./ReactLogo";

interface HeaderProps {
  imageUrl: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ imageUrl, children }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <ReactLogo imageUrl={imageUrl}/>
      </div>
      <div className="header__content">
        {children}
      </div>
    </header>
  );
};

export default Header;

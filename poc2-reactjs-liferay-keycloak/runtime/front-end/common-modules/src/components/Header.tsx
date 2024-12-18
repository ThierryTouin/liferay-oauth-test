
import React from "react";
import "../styles/header.css";
import { ReactLogo } from "./ReactLogo";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <ReactLogo/>
      </div>
      <div className="header__content">
        {children}
      </div>
    </header>
  );
};

export default Header;

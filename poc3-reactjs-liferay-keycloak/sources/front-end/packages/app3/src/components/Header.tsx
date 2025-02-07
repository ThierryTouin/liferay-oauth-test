import React from "react";

interface HeaderProps {
  imageUrl: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ imageUrl, children }) => {
  return (
    <header className="header">
      <div className="header__content">
        {children}
      </div>
    </header>
  );
};

export default Header;

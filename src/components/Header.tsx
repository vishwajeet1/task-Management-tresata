import React from "react";
import BackArrowIcon from "../assets/back-arrow.svg";
import "../styles/Header.css";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBack,
}) => {
  return (
    <header className="app-header">
      {showBackButton && onBack && (
        <button className="back-button" onClick={onBack}>
          <img src={BackArrowIcon} alt="Back" className="back-icon" />
        </button>
      )}
      <h1>{title}</h1>
    </header>
  );
};

export default Header;

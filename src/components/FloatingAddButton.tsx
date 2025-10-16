import React from "react";
import "../styles/FloatingAddButton.css";

interface FloatingAddButtonProps {
  onClick: () => void;
}

const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onClick }) => {
  return (
    <button className="floating-add-button" onClick={onClick}>
      <span className="add-icon">+</span>
    </button>
  );
};

export default FloatingAddButton;

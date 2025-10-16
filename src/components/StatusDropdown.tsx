import React, { useState, useRef, useEffect } from "react";
import { type TaskStatus } from "../types/Task";
import ArrowIcon from "../assets/arrrow.svg";
import "../styles/StatusDropdown.css";

interface StatusDropdownProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  value,
  onChange,
  id,
  name,
  disabled = false,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Available status options with their colors
  const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
    { value: "pending", label: "Pending", color: "#D0D0D0" },
    { value: "in-progress", label: "In Progress", color: "#FFB03C" },
    { value: "completed", label: "Completed", color: "#368A04" },
  ];

  const selectedOption = statusOptions.find((option) => option.value === value);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (status: TaskStatus) => {
    onChange(status);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="status-dropdown-container" ref={dropdownRef}>
      <div
        className={`status-dropdown-trigger ${isOpen ? "open" : ""} ${
          disabled ? "disabled" : ""
        }`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={required}
        id={id}
      >
        <div className="status-option">
          <span
            className="status-dot"
            style={{ backgroundColor: selectedOption?.color }}
          ></span>
          <span className="status-label">{selectedOption?.label}</span>
        </div>
        <img
          src={ArrowIcon}
          alt="Expand/Collapse"
          className={`dropdown-arrow ${isOpen ? "open" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="status-dropdown-menu" role="listbox">
          {statusOptions.map((option) => (
            <div
              key={option.value}
              className={`status-dropdown-option ${
                value === option.value ? "selected" : ""
              }`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              <span
                className="status-dot"
                style={{ backgroundColor: option.color }}
              ></span>
              <span className="status-label">{option.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} required={required} />
    </div>
  );
};

export default StatusDropdown;

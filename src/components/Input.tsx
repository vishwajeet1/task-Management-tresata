import React from "react";
import "../styles/Input.css";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "default" | "search" | "form";
  id?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  required = false,
  className = "",
  icon,
  iconPosition = "left",
  variant = "default",
  id,
  name,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputClasses = [
    "input",
    `input--${variant}`,
    icon && `input--with-icon input--icon-${iconPosition}`,
    error && "input--error",
    disabled && "input--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Generate unique id if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        {icon && iconPosition === "left" && (
          <div className="input-icon input-icon--left">{icon}</div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={inputClasses}
        />

        {icon && iconPosition === "right" && (
          <div className="input-icon input-icon--right">{icon}</div>
        )}
      </div>

      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default Input;

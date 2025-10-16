import React from "react";
import "../styles/TextArea.css";

interface TextAreaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  variant?: "default" | "form";
  id?: string;
  name?: string;
  rows?: number;
  maxLength?: number;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  required = false,
  className = "",
  variant = "default",
  id,
  name,
  rows = 4,
  maxLength,
  resize = "vertical",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const textAreaClasses = [
    "textarea",
    `textarea--${variant}`,
    `textarea--resize-${resize}`,
    error && "textarea--error",
    disabled && "textarea--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Generate unique id if not provided
  const textAreaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="textarea-container">
      {label && (
        <label htmlFor={textAreaId} className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}

      <div className="textarea-wrapper">
        <textarea
          id={textAreaId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={textAreaClasses}
          rows={rows}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
};

export default TextArea;

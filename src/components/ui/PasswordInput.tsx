import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  minLength?: number;
  autoComplete?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export function PasswordInput({
  id,
  value,
  onChange,
  placeholder = "Enter your password",
  required = false,
  disabled = false,
  className = "",
  minLength,
  autoComplete = "current-password",
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow toggle with Enter or Space when focused on the toggle button
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePasswordVisibility();
    }
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full pr-12 pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        minLength={minLength}
        autoComplete={autoComplete}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded p-1 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={showPassword ? "Hide password" : "Show password"}
        tabIndex={0}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Eye className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
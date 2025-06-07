import React from 'react';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  autoComplete = 'off',
  ...rest
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-semibold text-text"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full px-3 py-2 text-base rounded border border-secondary bg-background text-text focus:outline-none focus:border-primary transition-colors"
        {...rest}
      />
    </div>
  );
};

export default FormInput;

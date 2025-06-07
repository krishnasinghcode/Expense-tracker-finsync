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
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            marginBottom: '0.3rem',
            color: 'var(--color-text)',
            fontWeight: '600',
            fontSize: '0.9rem',
          }}
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
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: `1.5px solid var(--color-secondary)`,
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
          transition: 'border-color 0.3s ease',
          outline: 'none',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--color-primary)')}
        onBlur={e => (e.target.style.borderColor = 'var(--color-secondary)')}
        {...rest}
      />
    </div>
  );
};

export default FormInput;

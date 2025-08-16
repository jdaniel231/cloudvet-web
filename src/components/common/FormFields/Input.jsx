import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, required = false, ...props }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-text text-sm font-bold mb-2"
    >
      {label}:
    </label>
    <input
      type={type}
      id={id}
      className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
      value={value}
      onChange={onChange}
      required={required}
      {...props}
    />
  </div>
);

export default Input;

import React from 'react';

const Select = ({ label, id, value, onChange, required = false, children, ...props }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-text text-sm font-bold mb-2"
    >
      {label}:
    </label>
    <select
      id={id}
      className="shadow appearance-none border border-border rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary"
      value={value}
      onChange={onChange}
      required={required}
      {...props}
    >
      {children}
    </select>
  </div>
);

export default Select;

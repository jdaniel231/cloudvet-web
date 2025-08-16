import React from 'react';

const Checkbox = ({ label, id, checked, onChange, ...props }) => (
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      id={id}
      className="mr-2 h-4 w-4 text-primary focus:ring-primary border-border rounded"
      checked={checked}
      onChange={onChange}
      {...props}
    />
    <label htmlFor={id} className="text-text text-sm font-bold">
      {label}
    </label>
  </div>
);

export default Checkbox;

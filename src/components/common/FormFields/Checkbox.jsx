import React from 'react';

const Checkbox = ({ label, id, checked, onChange, ...props }) => (
  <div className="mb-5 flex items-center group">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        id={id}
        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-slate-50 checked:border-cyan-500 checked:bg-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <label
      htmlFor={id}
      className="ml-3 text-sm font-medium text-slate-600 cursor-pointer select-none group-hover:text-cyan-700 transition-colors"
    >
      {label}
    </label>
  </div>
);

export default Checkbox;

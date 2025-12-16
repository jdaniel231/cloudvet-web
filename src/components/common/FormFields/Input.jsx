import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, required = false, ...props }) => (
  <div className="mb-5 group">
    <label
      htmlFor={id}
      className="block text-slate-700 text-sm font-semibold mb-2 ml-1 tracking-wide group-focus-within:text-cyan-700 transition-colors"
    >
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      id={id}
      className="shadow-sm appearance-none border border-slate-200 rounded-xl w-full py-2.5 px-4 text-slate-700 leading-tight bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 placeholder-slate-400"
      value={value}
      onChange={onChange}
      required={required}
      {...props}
    />
  </div>
);

export default Input;

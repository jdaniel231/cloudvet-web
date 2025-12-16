import React from 'react';

const Select = ({ label, id, value, onChange, required = false, children, ...props }) => (
  <div className="mb-5 group">
    <label
      htmlFor={id}
      className="block text-slate-700 text-sm font-semibold mb-2 ml-1 tracking-wide group-focus-within:text-cyan-700 transition-colors"
    >
      {label}{required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      <select
        id={id}
        className="shadow-sm appearance-none border border-slate-200 rounded-xl w-full py-2.5 px-4 pr-8 text-slate-700 leading-tight bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 cursor-pointer"
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
  </div>
);

export default Select;

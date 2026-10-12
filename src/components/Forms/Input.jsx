import React from 'react'

const Input = ({ label, type, placeholder, name, defaultValue }) => {
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
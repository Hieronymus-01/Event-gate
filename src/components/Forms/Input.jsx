import React from 'react'

const Input = ({ label, type, placeholder, name, defaultValue }) => {
  return (
    <fieldset className="fieldset w-full">
      <legend className="fieldset-legend">{label}</legend>
      <input
        name={name}
        type={type}
        className="input input-bordered w-full"
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </fieldset>
  );
};

export default Input;
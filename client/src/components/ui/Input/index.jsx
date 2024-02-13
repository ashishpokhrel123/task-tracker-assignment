import React, { useState } from "react";

const CustomInput = ({ type, label, required, ...rest }) => {
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (required && inputValue.trim() === "") {
      setError(`${label} is required`);
    } else {
      setError("");
    }

    if (rest.onChange) {
      rest.onChange(event);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={rest.id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type} 
        placeholder={`Enter ${label}`}
        className="border border-black rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight"
        {...rest}
        onChange={handleInputChange}
      />
      {error && <p className="text-red-500 text-sm bold">{error}</p>}
    </div>
  );
};

export default CustomInput;

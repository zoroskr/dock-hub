import React from "react";

const CustomCheckbox = ({ type, label = false, handleCheckboxChange }) => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        id={type}
        className="m-1 rounded-xl focus:outline-none"
        style={{ outline: "none", boxShadow: "none" }}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={type} className="">
        {label ? label : type}
      </label>
    </div>
  );
};

export default CustomCheckbox;

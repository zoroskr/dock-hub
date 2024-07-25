import React from "react";

const FilterButton = ({ text, handleClick }) => {
  return (
    <button
      className="text-white rounded-xl bg-gray-800 duration-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-xs lg:text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default FilterButton;

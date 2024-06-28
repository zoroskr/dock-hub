import React from "react";

const Title = ({ text }) => {
  return (
    <div className="flex items-center justify-center w-full h-24 dark:bg-gray-800">
      <h1 
        className="text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white p-6">
        {text}
      </h1>
    </div>
  );
};

export default Title;

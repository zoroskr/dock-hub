import React from "react";

const EmptyList = ({ message }) => {
  return (
    <div className="grid place-items-center h-96">
      <span className="text-4xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-light">{message}</span>
    </div>
  );
};

export default EmptyList;

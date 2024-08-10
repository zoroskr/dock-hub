import React from "react";

const EmptyList = ({ message }) => {
  return (
    <div className="grid place-items-center w-screen h-96 text-center">
      <span className="text-2xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium">{message}</span>
    </div>
  );
};

export default EmptyList;

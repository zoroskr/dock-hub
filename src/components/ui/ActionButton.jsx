import { Button } from "flowbite-react";
import React from "react";

const ActionButton = ({ text, handleSubmit, isDisabled }) => {
  console.log("isDisabled", isDisabled);

  return (
    <Button
      onClick={handleSubmit}
      className="inline-flex items-center mx-auto mb-2 mt-1 px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-xl duration-300 hover:bg-gray-700"
      disabled={!isDisabled}
    >
      {text}
    </Button>
  );
};

export default ActionButton;

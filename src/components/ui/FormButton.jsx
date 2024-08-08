import React from "react";

const FormButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="text-black  bg-custom-yellow duration-300 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
    >
      {text}
    </button>
  );
};

export default FormButton;

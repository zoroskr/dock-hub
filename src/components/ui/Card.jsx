import React from 'react'

const Card = ({ children }) => {
  return (
    <div
      className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
    >
      <div className="p-5 grid place-items-center">
        {children}
      </div>
    </div>
  );
}

export default Card
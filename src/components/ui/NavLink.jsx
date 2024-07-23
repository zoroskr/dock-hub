import React from "react";
import Link from "next/link";

const NavLink = ({ text, path }) => {
  return (
    <Link
      href={`/${path}`}
      className="block py-2 px-3 text-md text-white rounded md:hover:bg-transparent duration-300 md:hover:scale-110 hover:bg-gray-700"
    >
      {text}
    </Link>
  );
};

export default NavLink;

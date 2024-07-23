"use client";

import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("id");
      const userType = localStorage.getItem("type");
      setIsLoggedIn(!!userId);
      setUserType(userType);
    }
  }, []);

  return (
    <nav className="bg-gray-900 border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-1 p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/logo_yatemate.png"
            width={100}
            height={100}
            className="rounded-full"
            alt="YateMate Logo"
            priority
          />
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Avatar handleLogout={handleLogout} />

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-xl md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-xl bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900">
            <li>
              <NavLink text="Inicio" path="" />
            </li>
            {userType === "Admin" && isLoggedIn && (
              <>
                <li>
                  <NavLink text="Resgistrar administrativo" path="admin/register" />
                </li>
                <li>
                  <NavLink text="Reservas" path="reservations" />
                </li>
              </>
            )}
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink text="Amarras" path="amarras" />
                </li>
                {userType !== "Admin" && (
                  <li>
                    <NavLink text="Crear Publicación" path="publicar" />
                  </li>
                )}
                {localStorage.getItem("type") === "Titular" && (
                  <li>
                    <NavLink text="Cargar embarcación" path="publicarEmbarcacion" />
                  </li>
                )}
              </>
            ) : (
              <>
                <li>
                  <NavLink text="Iniciar sesión" path="login" />
                </li>
                <li>
                  <NavLink text="Registrarse" path="register" />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

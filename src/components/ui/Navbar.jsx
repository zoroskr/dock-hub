"use client";

import React, { useEffect, useState } from "react";

import {Navbar } from "flowbite-react";

import Avatar from "./Avatar";
import Image from "next/image";
import Link from "next/link";


const Nav = () => {
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
    <Navbar fluid rounded className="bg-gray-900 text-sm">
      <Navbar.Brand href="https://flowbite-react.com">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/logo_yatemate.png"
            width={100}
            height={100}
            className="rounded-md"
            alt="Flowbite Logo"
            style={{ borderRadius: "50%" }}
            priority
          />
        </Link>
      </Navbar.Brand>

      <div className="flex md:order-2">
        <Avatar handleLogout={handleLogout} />
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse className="text-black">
        <li>
          <Link
            href="/"
            className="block py-2 px-3 text-md md:text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 md:hover:scale-110 bg-custom-yellow"
            aria-current="page"
          >
            <Navbar.Link as="a">Inicio</Navbar.Link>
          </Link>
        </li>
        {userType === "Admin" && isLoggedIn && (
          <>
            <li>
              <Link
                href="/admin/register"
                className="block py-2 px-3 text-md text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 md:hover:scale-110"
                aria-current="page"
              >
                <Navbar.Link as="a">Registrar administrativo</Navbar.Link>
              </Link>
            </li>
            <li>
              <Link
                href="/reservations"
                className="block py-2 px-3 text-md text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 md:hover:scale-110"
                aria-current="page"
              >
                <Navbar.Link as="a">Reservas</Navbar.Link>
              </Link>
            </li>
          </>
        )}
        {isLoggedIn ? (
          <>
            <li>
              <Link
                href="/amarras"
                className="block py-2 px-3 text-md text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 md:hover:scale-110"
                aria-current="page"
              >
                <Navbar.Link as="a">Amarras</Navbar.Link>
              </Link>
            </li>
            {userType !== "Admin" && (
              <li>
                <Link
                  href="/publicar"
                  className="block py-2 px-3 text-md text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 md:hover:scale-110"
                  aria-current="page"
                >
                  <Navbar.Link as="a">Crear Publicación</Navbar.Link>
                </Link>
              </li>
            )}
            {localStorage.getItem("type") === "Titular" && (
              <li>
                <Link
                  href="/publicarEmbarcacion"
                  className="block py-2 px-3 text-md text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 md:hover:scale-110"
                >
                  <Navbar.Link as="a">Cargar embarcación</Navbar.Link>
                </Link>
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className="block py-2 px-3 text-md text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 md:hover:scale-110"
                aria-current="page"
              >
                <Navbar.Link as="a">Iniciar sesión</Navbar.Link>
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="block py-2 px-3 text-md text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 md:hover:scale-110"
                aria-current="page"
              >
                <Navbar.Link as="a">Registrarse</Navbar.Link>
              </Link>
            </li>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;

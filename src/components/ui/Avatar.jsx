"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "@/app/services/users.api";

const Avatar = ({ handleLogout }) => {
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const refDropdown = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (typeof window !== "undefined") {
        const userId = localStorage.getItem("id");
        const user = await getUser(userId);
        setUser(user);
        const userType = localStorage.getItem("type");
        setIsAdmin(userType === "Admin");
      }
    };
    fetchInitialData();
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refDropdown.current && !refDropdown.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refDropdown]);

  return (
    <div className="relative" ref={refDropdown}>
      <span className="ml-2 cursor-pointer" onClick={toggleDropdown}>
        <div className="inline-block rounded-full bg-rgb-190-175-85 p-1 duration-300 hover:scale-110">
          <Image src="/user48.png" alt="" width={30} height={30} />
        </div>
      </span>
      {isOpen && (
        <div
          className="w-44 absolute right-0 z-10 bg-white border border-gray-200 rounded-xl shadow border-t-0 divide-y divide-gray-100"
          style={{ top: "calc(100% + 8px)" }}
        >
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.fullName}</div>
            <div class="font-medium truncate">{user.email}</div>
          </div>
          <ul className="py-1">
            {isAdmin ? (
              <>
                <li>
                  <Link href="/admin/register" className="block px-4 py-2 hover:bg-gray-100">
                    Registrar administrativo
                  </Link>
                </li>
              </>
            ) : (
              <>
                {localStorage.getItem("type") === "Titular" && (
                  <>
                    <li>
                      <Link href="/mis-amarras" className="block px-4 py-2 hover:bg-gray-100">
                        Mis amarras
                      </Link>
                    </li>
                    <li>
                      <Link href="/boats" className="block px-4 py-2 hover:bg-gray-100">
                        Mis embarcaciones
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link href="/posts" className="block px-4 py-2 hover:bg-gray-100">
                    Mis publicaciones
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="block px-4 py-2 hover:bg-gray-100">
                    Mis favoritos
                  </Link>
                </li>
                <li>
                  <Link href="/chats" className="block px-4 py-2 hover:bg-gray-100" aria-current="page">
                    Mis chats
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link href="/reservations" className="block px-4 py-2 hover:bg-gray-100">
                {isAdmin ? "Reservas" : "Mis reservas"}
              </Link>
            </li>
            <li>
              <Link href={`/editarperfil/${localStorage.getItem("id")}`} className="block px-4 py-2 hover:bg-gray-100">
                Editar Perfil
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <Link href="/login" className="block px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
              Cerrar sesión
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;

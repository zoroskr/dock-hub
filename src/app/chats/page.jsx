"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "../services/users.api";
import Link from "next/link";

const Page = () => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Estado para rastrear la carga

  useEffect(() => {
    const loadChats = async () => {
      let obtenerUser = await getUser(localStorage.getItem("id"));
      console.log("🚀 ~ loadChats ~ obtenerUser:", obtenerUser);

      setUser(obtenerUser);
      const getChats = await fetch(`http://localhost:3000/api/chats`);
      console.log("🚀 ~ loadChats ~ getChats:", getChats);
      if (getChats.ok) {
        const chats = await getChats.json();
        console.log("🚀 ~ CHATS DE UN USER ~ CHATS DE UN USER:", chats);
        const filteredChats = chats.filter((chat) => chat.users.includes(obtenerUser._id));
        console.log("🚀 ~ loadChats ~ user:", obtenerUser);

        setChats(filteredChats);
      }
      setLoading(false); // Deja de cargar después de obtener los chats
    };
    loadChats();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 text-white text-center w-full max-w-2xl m-8 p-6 rounded-2xl">
        <h1 className="font-bold p-3 text-2xl">Chats</h1>
        {loading ? ( // Mostrar mensaje de carga mientras se cargan los chats
          <p>Cargando chats...</p>
        ) : (
          <ul className="flex flex-col items-center">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <li key={chat._id} className="w-full">
                  <Link href={`/chats/${chat._id}`} className="flex justify-center">
                    <div className="flex flex-col bg-custom-yellow2 text-black rounded-xl p-3 m-3 w-2/3 duration-300 hover:scale-105">
                      <span>user: {chat.users[1]}</span>
                      <span>chat ID: {chat._id}</span>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p>No se encontraron chats.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;


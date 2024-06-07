"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "../services/users.api";
import Link from "next/link";

const Page = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para rastrear la carga

  useEffect(() => {
    const loadChats = async () => {
      let obtenerUser = await getUser(localStorage.getItem("id"));
      console.log("🚀 ~ loadChats ~ obtenerUser:", obtenerUser);
      const chatsUser = await getChatsUser();
      console.log("🚀 ~ loadChats ~ chatsUser:", chatsUser)
      setChats(chatsUser);
      setLoading(false); // Deja de cargar después de obtener los chats
    };
    loadChats();
  }, []);

  const getChatsUser = async () => {
    const user = await getUser(localStorage.getItem("id"));
    const chatsPromises = user.chats.map(async (chatId) => {
      const response = await fetch(`http://localhost:3000/api/chats/${chatId}`);
      if (response.ok) {
        return response.json();
      }
    });
    const chatsUser = await Promise.all(chatsPromises);
    console.log("🚀 ~ getChatsUser ~ chatsUser:", chatsUser);
    return chatsUser;
  };

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


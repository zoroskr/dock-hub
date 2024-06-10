"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "../services/users.api";
import Link from "next/link";

const Page = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para rastrear la carga
  const [userType, setUserType] = useState(null); // Nuevo estado para almacenar el tipo de usuario

  useEffect(() => {
    const type = localStorage.getItem("type");
    setUserType(type);
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      const chatsUser = await getFullChatsUser();
      setChats(chatsUser);
      setLoading(false); // Deja de cargar después de obtener los chats

    };
    loadChats();
  }, []);

  // Retorna los datos de los chats más el ultimo mensaje y el receptor
  const getFullChatsUser = async () => {
    const user = await getUser(localStorage.getItem("id"));
    const chatsPromises = user.chats.map(async (chatId) => {
      const response = await fetch(`http://localhost:3000/api/chats/${chatId}`);
      if (response.ok) {
        const chat = await response.json();
        const receiverUserId = chat.users[0] === user._id ? chat.users[1] : chat.users[0];
        const receiverUser = await getUser(receiverUserId);
        const senderUserId = chat.users.find(userId => userId !== receiverUserId);
        const senderUser = await getUser(senderUserId);
        const lastMessage = chat.messages[chat.messages.length - 1];
        return { ...chat, lastMessage, receiverUser, senderUser };
      }
    });
    const chatsUser = await Promise.all(chatsPromises);
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
                    <span className="font-bold">
                      {userType === "Admin" && chat.senderUser && chat.receiverUser
                        ? `${chat.senderUser.fullName} - ${chat.receiverUser.fullName}`
                        : chat.receiverUser && chat.receiverUser.fullName}
                    </span>
                    <span>{chat.lastMessage ? chat.lastMessage.content : null}</span>
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

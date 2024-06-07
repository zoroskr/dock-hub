"use client";
import React, { useEffect, useState } from "react";
import { getUser } from "../services/users.api";
import Link from "next/link";
import { get } from "http";

const page = () => {
  const [chats, setChats] = useState([]);
  const [fullChats, setFullChats] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadChats = async () => {
      let obtenerUser = await getUser(localStorage.getItem("id"));
      console.log("🚀 ~ loadChats ~ obtenerUser:", obtenerUser)

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
    };
    loadChats();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-900 text-white text-center w-full max-w-2xl m-8 p-6 rounded-2xl">
        <h1 className="font-bold p-3 text-xl">Chats</h1>
        <ul className="flex flex-col items-center">
          {chats.map((chat) => (
            <li key={chat._id} className="w-full">
              <Link href={`/chats/${chat._id}`} className="flex justify-center">
                <div className="flex flex-col bg-custom-yellow2 text-black rounded-xl p-3 m-3 w-2/3 duration-300 hover:scale-105">
                  <span>user: {chat.users[1]}</span>
                  <span>chat ID: {chat._id}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;

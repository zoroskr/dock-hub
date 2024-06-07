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
    <div className="bg-gray-900 m-8 text-white text-center">
      <h1 className="">Chats</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>
            <Link href={`/chats/${chat._id}`}>
                <div className="flex flex-col bg-blue-500 m-5">
                  <span>user:{chat.users[1]}</span>
                  <span>chat ID:{chat._id}</span>
                </div> 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;

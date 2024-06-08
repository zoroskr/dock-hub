"use client";
import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useParams } from "next/navigation";
import { getUser } from "../../services/users.api";
import { updateChat } from "@/app/services/chats.api";

const ChatInterface = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [chat, setChat] = useState(null);
  const [user, setUser] = useState({});
  const [otherUser, setOtherUser] = useState({});
  // const [chats, setChats] = useState([]);
  const params = useParams();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "") {
      const newMessage = { sender: user.fullName, content: currentMessage, createdAt: new Date()};
      try {
        const updatedChat = await updateChat(params.id, { ...chat, messages: [...chat.messages, newMessage] });
        setChat(updatedChat);
        setCurrentMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    const loadChatAndMessages = async () => {
      try {
        const usuario = await getUser(localStorage.getItem("id"));
        setUser(usuario);

        const chatResponse = await fetch(`http://localhost:3000/api/chats/${params.id}`);
        if (chatResponse.ok) {
          const chatData = await chatResponse.json();
          setChat(chatData);
          const idOtroUsuario = chatData.users.find((userId) => userId != usuario._id);
          const otroUsuario = await getUser(idOtroUsuario);
          setOtherUser(otroUsuario);
        }
      } catch (error) {
        console.error("Error loading chat and messages:", error);
      }
    };

    loadChatAndMessages();

    const intervalId = setInterval(loadChatAndMessages, 2000);
    return () => clearInterval(intervalId);
  }, [params.id]);

  if (!chat) return <div className="font-bold">Cargando...</div>;

  return (
    <div className="flex flex-col w-full justify-center items-center p-10">
      {/* <ul className="flex justify-center p-3 overflow-auto">
        {chats.map((chat) => (
          <li key={chat._id} className="m-4 cursor-pointer">
            {chat._id}
          </li>
        ))}
      </ul> */}
      <div className="w-full max-w-lg max-h-[40rem] rounded-xl bg-gray-400 flex flex-col">
        <div className="text-center text-2xl bg-gray-800 text-white font-semibold rounded-t-xl p-3">
          {otherUser ? `${otherUser.fullName}` : "Cargando usuario..."}
        </div>
        <div className="overflow-auto p-4 bg-gray-800">
          {chat.messages.map((message, index) => (
            <div key={index} className={`flex ${user && message.sender === user.fullName ? "justify-end" : "justify-start"}`}>
              <div className={`bg-custom-yellow text-black p-3 m-4 rounded-xl max-w-xs`}>
                <div className="text-sm mb-1 text-black font-bold justify-end">{message.sender}</div>
                <div className="overflow-auto break-words">{message.content}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex p-4 bg-white border-t border-gray-200 rounded-b-xl">
          <input
            className="flex-grow px-4 py-2 mr-4 rounded-xl border border-gray-300"
            placeholder="Escribe un mensaje..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <div className="flex flex-1">
            <button type="submit" className="w-1/2 p-1 mx-1 rounded-xl bg-gray-800 duration-300 hover:bg-gray-500 text-white">
              Enviar
            </button>
            <Button type="button" className="w-1/2 p-1 mx-1 rounded-xl bg-gray-800 duration-300 hover:bg-gray-500 text-white">
              Aceptar intercambio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;

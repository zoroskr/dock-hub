"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { getUser } from "../../services/users.api";

const ChatInterface = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState();
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);
  const params = useParams();

  // const chatId = params.id; // Asume que la ruta es algo como /chat/[id]

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "") {
      const newMessage = { sender: user.fullName, content: currentMessage, chatId: params.id };
      const response = await fetch("http://localhost:3000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        const message = await response.json();
        setMessages([...messages, message]);
        setCurrentMessage("");
      }
    }
  };

  useEffect(() => {

    const loadMessages = async () => {
      const usuario = await getUser(localStorage.getItem("id"));
      setUser(usuario);
      console.log("🚀 ~ loadMessages ~ setUser:", user);

      const response = await fetch(`http://localhost:3000/api/chats/${params.id}`);
      if (response.ok) {
        const chat = await response.json();
        console.log(chat.messages);

        const responseAllMessages = await fetch(`http://localhost:3000/api/messages`);
        if (responseAllMessages.ok) {
          const allMessages = await responseAllMessages.json();
          const filteredMessages = allMessages.filter((message) => chat.messages.includes(message._id));
          setMessages(filteredMessages);
        }
      }
      setChatId(params.id);
    };

    // Cargar los mensajes inmediatamente después de que el componente se monte
    loadMessages();

    // Configurar un intervalo para cargar nuevos mensajes cada 5 segundos
    const intervalId = setInterval(loadMessages, 2000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-row bg-red-500 ">
      <ul className="flex justify-center bg-green-500 p-10">
        {chats.map((chat) => (
          <li key={chat._id} className="m-4 cursor-pointer">
            {chat._id}
          </li>
        ))}
      </ul>
      <div className="w-1/2">
        <div className="overflow-auto p-4 bg-gray-800 ">
          {messages.map((message, index) =>
            message.sender == user.fullName ? (
              <div key={index} className="flex justify-end">
                <div className="flex bg-red-600 p-5 m-4 rounded-xl">{message.content}</div>
              </div>
            ) : (
              <div>
                <div key={index} className="rounded-xl inline-block bg-blue-900 p-5 m-4">
                  {message.content}
                </div>
              </div>
            ),
          )}
        </div>
        <form onSubmit={sendMessage} className="flex p-4 bg-white border-t border-gray-200">
          <input
            className="flex-grow px-4 py-2 mr-4 rounded-lg border border-gray-300"
            placeholder="Escribe un mensaje..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const ChatInterface = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(); // Añadir un estado para almacenar la información del chat [1
  const router = useRouter();
  const params = useParams();

  // const chatId = params.id; // Asume que la ruta es algo como /chat/[id]

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {
      const newMessage = { sender: "User", content: currentMessage, chatId: params.id };
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
      const response = await fetch(`http://localhost:3000/api/messages/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data.messages);

        const responseAllMessages = await fetch(`http://localhost:3000/api/messages`);
        if (responseAllMessages.ok) {
          const allMessages = await responseAllMessages.json();

          const filteredMessages = allMessages.filter((message) => data.messages.includes(message._id));

          setMessages(filteredMessages);
        }
      }
      setChatId(params.id);
      console.log(params.id);
    };

    // Cargar los mensajes inmediatamente después de que el componente se monte
    loadMessages();

    // Configurar un intervalo para cargar nuevos mensajes cada 5 segundos
    const intervalId = setInterval(loadMessages, 2000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="overflow-auto p-4">
        {messages.map((message, index) => (
          <p key={index}>
            <strong>{message.sender}:</strong> {message.content}
          </p>
        ))}
      </div>
      <div className="flex p-4 bg-white border-t border-gray-200">
        <input
          className="flex-grow px-4 py-2 mr-4 rounded-lg border border-gray-300"
          placeholder="Escribe un mensaje..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;

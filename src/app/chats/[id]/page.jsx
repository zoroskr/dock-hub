"use client";
import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useParams } from "next/navigation";
import { getUser, getAdmin, updateUser } from "../../services/users.api";
import { updateChat, getChat } from "@/app/services/chats.api";

const ChatInterface = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [chat, setChat] = useState(null);
  const [user, setUser] = useState({});
  const [otherUser, setOtherUser] = useState({});
  const [showDateTimeForm, setShowDateTimeForm] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [exchangeInfo, setExchangeInfo] = useState("");

  // const [chats, setChats] = useState([]);
  const params = useParams();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "") {
      const newMessage = { sender: user.fullName, content: currentMessage, createdAt: new Date() };
      try {
        const updatedChat = await updateChat(params.id, { ...chat, messages: [...chat.messages, newMessage] });
        setChat(updatedChat);
        setCurrentMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const acceptTrade = async (e) => {
    e.preventDefault();
    try {
    const chat = await getChat(params.id);
    if ((!chat.agree.includes(localStorage.getItem("id")) && (chat.agree.length == 1))) {
        let admin = await getAdmin();
        admin = await updateUser(admin._id, {...admin, chats: [...admin.chats, params.id]});
        const updatedChat = await updateChat(params.id, {users: [...chat.users, admin], agree: [...chat.agree, localStorage.getItem("id")]});      
    } else {
      const updatedChat = await updateChat(params.id, {agree: [localStorage.getItem("id")]});
    }
  } catch (error){
    console.error("Error accepting trade: ", error);
  }
  }

  const deleteChat = async (chatId) => {
    window.location.href = "http://localhost:3000/chats";
    try {
      const response = await fetch(`http://localhost:3000/api/chats/${chatId}`, {
        method: "DELETE", // Asegúrate de que el método sea el correcto para tu 
      });
      if (response.ok) {
        console.log("Chat eliminado con éxito");
        // Aquí puedes redirigir al usuario o actualizar el estado para reflejar que el chat fue eliminado
      } else {
        console.error("Error al eliminar el chat");
      }
    } catch (error) {
      console.error("Error al eliminar el chat:", error);
    }
  };

  const handleAuthorizeClick = () => {
    setShowDateTimeForm(true);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmitDateTime = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
  
    try {
      const response = await fetch(`http://localhost:3000/api/intercambio/${params.id}`, { // Corregido: eliminado el `}` al final de la URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          time: time,
          chatId: params.id
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar la fecha y hora');
      }
  
      const result = await response.json();
      console.log('Fecha y hora guardadas:', result);
  
      // Manejo de éxito
    } catch (error) {
      console.error('Error al enviar la fecha y hora:', error);
      // Manejo de error
    }
    window.location.reload();
  }

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

  useEffect(() => {
    const fetchExchangeInfo = async () => {
      try {
        // Asume que params.id es el chatId que quieres filtrar
        const chatId = params.id; // O la variable que contenga el chatId deseado
        const response = await fetch(`http://localhost:3000/api/intercambio/${chatId}`);
        if (!response.ok) {
          throw new Error('Error al obtener la información del intercambio');
        }
        const data = await response.json();
        setExchangeInfo(data); // Guarda la respuesta filtrada por chatId como objeto
      } catch (error) {
        console.error('Error al obtener la información del intercambio:', error);
      }
    };
  
    fetchExchangeInfo();
  }, [params.id]); // Dependencia en params.id para recargar si el ID cambia

  if (!chat) return <div className="font-bold">Cargando...</div>;

  const fecha = exchangeInfo ? new Date(exchangeInfo.date).toLocaleDateString() : '';
  const hora = exchangeInfo ? exchangeInfo.time : '';

  return (
    <>
      <div>
      {exchangeInfo && (
        <p>La fecha del intercambio será: {fecha} y la hora es {hora}</p>
      )}
      </div>
    <div className="flex flex-col w-full justify-center items-center p-10">
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
            <Button type="button" className="w-1/2 p-1 mx-1 rounded-xl bg-gray-800 duration-300 hover:bg-gray-500 text-white" onClick={acceptTrade}>
              Aceptar intercambio
            </Button>
          </div>
        </form>
        <div className="flex flex-1 p-4 bg-white border-t border-gray-200">
          <button
            className="px-4 py-2 rounded-xl bg-red-800 duration-300 hover:bg-red-500 text-white"
            onClick={() => deleteChat(params.id)}
          >
            Eliminar
          </button>
          {localStorage.getItem("type") != "admin" && (
            <>
              <Button
                type="button"
                className="w-1/2 p-1 mx-1 rounded-xl bg-gray-800 duration-300 hover:bg-gray-500 text-white"
                onClick={handleAuthorizeClick}
              >
                Autorizar intercambio
              </Button>
              {showDateTimeForm && (
                <div className="flex flex-col items-center mt-2">
                  <input
                    type="date"
                    value={date}
                    className="px-4 py-2 mr-4 rounded-xl border border-gray-300"
                    onChange={handleDateChange}
                  />
                  <input
                    type="time"
                    value={time}
                    className="px-4 py-2 mr-4 rounded-xl border border-gray-300"
                    onChange={handleTimeChange}
                  />
                  <Button type="button" className="px-4 py-2 mt-2 rounded-xl bg-gray-800 text-white" onClick={handleSubmitDateTime}>
                    Enviar
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );};

export default ChatInterface;

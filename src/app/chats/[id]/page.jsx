"use client";
import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useParams } from "next/navigation";
import { getUser, getAdmin, updateUser } from "../../services/users.api";
import { updateChat, getChat, deleteChat } from "@/app/services/chats.api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ChatInterface = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [chat, setChat] = useState(null);
  const [user, setUser] = useState({});
  const [otherUser, setOtherUser] = useState({});
  const [showDateTimeForm, setShowDateTimeForm] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [exchangeInfo, setExchangeInfo] = useState("");
  const route = useRouter();
  const [userType, setUserType] = useState(null); // Nuevo estado para almacenar el tipo de usuario

  // const [chats, setChats] = useState([]);
  const params = useParams();

  useEffect(() => {
    const type = localStorage.getItem("type");
    setUserType(type);
  }, []);

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
      if (chat.agree.length === 2) {
        Swal.fire({
          icon: "success",
          title: "Intercambio aceptado",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      if ((!chat.agree.includes(localStorage.getItem("id"))) && (chat.agree.length == 1)) {
        let admin = await getAdmin();
        admin = await updateUser(admin._id, { ...admin, chats: [...admin.chats, params.id] });
        let idsUsers = chat.users.map((user) => user._id);
        await updateChat(params.id, {
          users: [...chat.users, admin],
          agree: [...chat.agree, localStorage.getItem("id")],
        });
      } else {
        await updateChat(params.id, { agree: [localStorage.getItem("id")] });
      }
      Swal.fire({
        icon: "success",
        title: "Intercambio aceptado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error accepting trade: ", error);
    }
  };

  const verify = async (user) => {
    let data;
    try {
      const response = await fetch("http://localhost:3000/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      data = await response.json();
      if (data.message === "Forbidden") {
        return "Forbidden";
      }
      if (data.message === "El bien se encuentra inhibido") {
        return "Bien inhibido";
      }
      if (data.status === "inhabilitado" && data.message !== "El bien se encuentra inhibido") return "Embargado";
      return "ok";
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleAuthorizeClick = async () => {
    let data;
    try {
      const usuariosInvolucrados = chat.users.filter((userId) => userId !== user._id);
      console.log("🚀 ~ handleAuthorizeClick ~ usuariosInvolucrados:", usuariosInvolucrados);
      const involucrado1 = chat.users[0];
      const involucrado2 = chat.users[1];
      const verifiedInvolucrado1 = await verify({ dni: involucrado1.DNI, id_bien: "any" });
      const verifiedInvolucrado2 = await verify({ dni: involucrado2.DNI, id_bien: "any" });

      if (verifiedInvolucrado1 === "Forbidden" || verifiedInvolucrado2 === "Forbidden") {
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No fue posible conectarse al servidor de la AFIP, inténtalo de nuevo más tarde.",
        });
        return;
      }
      if (verifiedInvolucrado1 === "Bien inhibido") {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "El bien se encuentra inhibido",
        });
        return;
      }
      if (verifiedInvolucrado1 === "Embargado" || verifiedInvolucrado2 === "Embargado") {
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "Alguno de los involucrados cuenta con inhibición general de bienes",
        });
        return;
      }
      if (
        (verifiedInvolucrado1 === "ok" && verifiedInvolucrado2 === "ok") ||
        verifiedInvolucrado2 === "Bien inhibido"
      ) {
        setShowDateTimeForm(true);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const handleSubmitDateTime = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    // Si no se ingresa una fecha y hora completa, no es válido
    console.log("🚀 ~ handleSubmitDateTime ~ date:", date);
    if (date === "" || time === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingrese una fecha y hora válida",
      });
      return;
    }
    const fechaIngresada = new Date(`${date}T${time}`);
    const fechaActual = new Date();
    if (fechaIngresada <= fechaActual) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La fecha y hora ingresadas deben ser posteriores a la fecha y hora actuales",
      });
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/api/intercambio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          time: time,
          chatId: params.id,
          place: place,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la fecha y hora");
      }

      const result = await response.json();
      console.log("Fecha y hora guardadas:", result);

      // Manejo de éxito
    } catch (error) {
      console.error("Error al enviar la fecha y hora:", error);
      // Manejo de error
    }
    window.location.reload();
  };

  useEffect(() => {
    const loadChatAndMessages = async () => {
      try {
        const usuario = await getUser(localStorage.getItem("id"));
        setUser(usuario);
        const chat = await getChat(params.id);
        if (chat) {
          setChat(chat);
          const otroUsuario = chat.users.find((user) => user._id !== usuario._id && user.type !== "Admin");
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
          throw new Error("Error al obtener la información del intercambio");
        }
        const data = await response.json();
        setExchangeInfo(data); // Guarda la respuesta filtrada por chatId como objeto
      } catch (error) {
        console.error("Error al obtener la información del intercambio:", error);
      }
    };

    fetchExchangeInfo();
  }, [params.id]); // Dependencia en params.id para recargar si el ID cambia

  if (!chat) return <div className="font-bold">Cargando...</div>;

  const fecha = exchangeInfo ? new Date(exchangeInfo.date).toLocaleDateString() : "";
  const hora = exchangeInfo ? exchangeInfo.time : "";
  const lugar = exchangeInfo ? exchangeInfo.place : "";

  return (
    <>
      <div className="w-1/2 p-2 mx-auto mt-3 rounded-xl flex items-center justify-center">
        {exchangeInfo && (
          <p className="text-black font-bold text-lg">
            La fecha del intercambio será: {fecha} y la hora es {hora} en {lugar}
          </p>
        )}
      </div>
      <div className="flex flex-col w-full h-[30rem]  justify-center rounded-t-xl items-center p-10">
        <div className="w-full max-w-2xl max-h-[30rem] overflow-auto rounded-xl bg-gray-400 flex flex-col">
          <div className="flex">
            <div
              className={`text-center text-2xl bg-gray-800 text-white font-semibold p-3 ${userType !== "Admin" ? "w-4/5 rounded-tl-xl" : "w-full rounded-t-xl"}`}
            >
              {otherUser ? `${otherUser.fullName}` : "Cargando usuario..."}
            </div>
            {userType !== "Admin" && (
              <button
                className="w-1/5 justify-end p-3 bg-red-800 duration-300 hover:bg-red-500 text-white rounded-tr-xl"
                onClick={() => {
                  deleteChat(params.id);
                  route.push("/chats");
                }}
              >
                Eliminar
              </button>
            )}
          </div>
          <div className="overflow-auto p-4 bg-gray-800">
            {chat.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${user && message.sender === user.fullName ? "justify-end" : "justify-start"}`}
              >
                <div className={`bg-custom-yellow text-black p-3 m-4 rounded-xl max-w-xs`}>
                  <div className="text-sm mb-1 text-black font-bold justify-end">{message.sender}</div>
                  <div className="overflow-auto break-words">{message.content}</div>
                </div>
              </div>
            ))}
          </div>
          {userType !== "Admin" && !showDateTimeForm ? (
            <form onSubmit={sendMessage} className="flex p-4 bg-white border-t border-gray-200 rounded-b-xl">
              <textarea
                className="flex-grow overflow-auto break-words px-4 py-2 mr-4 rounded-xl border border-gray-300"
                placeholder="Escribe un mensaje..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                rows={1} // Ajusta este valor según el tamaño que desees
                style={{ resize: "none" }} // Evita que el textarea sea redimensionable
              />
              <div className="flex">
                <button
                  type="submit"
                  className="w-1/3 flex-1 p-1 mx-1 rounded-xl bg-gray-800 duration-300 hover:bg-gray-500 text-white"
                >
                  Enviar
                </button>
                <Button
                  type="button"
                  className="w-1/3 flex-1 p-1 mx-1 rounded-xl bg-gray-800 duration-300 hover:bg-gray-500 text-white"
                  onClick={acceptTrade}
                >
                  Aceptar intercambio
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex flex-1 p-4 rounded-b-xl bg-white border-t border-gray-200">
              {showDateTimeForm ? (
                <div className="flex flex-col w-full justify-center gap-3 items-center mt-2">
                  <input
                    type="date"
                    value={date}
                    className="p-3 rounded-xl border border-gray-300"
                    onChange={handleDateChange}
                  />
                  <input
                    type="time"
                    value={time}
                    className="p-3 rounded-xl border border-gray-300"
                    onChange={handleTimeChange}
                  />
                  <input
                    type="text"
                    value={place}
                    className="p-3 rounded-xl border border-gray-300"
                    onChange={handlePlaceChange}
                    placeholder="Lugar del intercambio"
                  />
                  <Button
                    type="button"
                    className="p-2 rounded-xl bg-gray-800 text-white duration-200 hover:bg-gray-700"
                    onClick={handleSubmitDateTime}
                  >
                    Enviar
                  </Button>
                </div>
              ) : exchangeInfo ? (
                <div className="flex rounded-2xl bg-green-800 mx-auto items-center justify-center p-4 text-white font-bold">
                  Este intercambio fue autorizado.
                </div> // Div en blanco
              ) : (
                <div className="flex w-full items-center justify-center">
                  <Button
                    type="button"
                    className="w-1/2 p-1 text-xl rounded-xl bg-gray-800 duration-300 hover:bg-gray-500 text-white"
                    onClick={handleAuthorizeClick}
                  >
                    Autorizar intercambio
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatInterface;

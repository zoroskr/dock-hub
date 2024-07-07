"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getUser, updateUser } from "@/app/services/users.api";
import Swal from "sweetalert2";
import { Button } from "flowbite-react";
import { deletePost, updatePost } from "@/app/services/posts.api";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";


const MapDisplay = dynamic(() => import("./MapSinDrag"), { ssr: false });



const Post = ({ post, showProposeButton, isFavorite = false, onRemoveFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncate, setNeedsTruncate] = useState(false);
  const [star, setStar] = useState(isFavorite);
  const router = useRouter();
  const [userType, setUserType] = useState(null); // Nuevo estado para almacenar el tipo de usuario
  const loggedUserId = localStorage.getItem("id");
  const showButton = loggedUserId && loggedUserId !== post.owner;
  const showOwnerButtons = loggedUserId && loggedUserId === post.owner;

  const descriptionRef = useRef(null);

  useEffect(() => {
    const type = localStorage.getItem('type');
    setUserType(type);
  }, []);

  useEffect(() => {
    if (descriptionRef.current) {
      setNeedsTruncate(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [post.description]);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const owner = await getUser(post.owner);
    const interesado = localStorage.getItem("id");
    const interesadoData = await getUser(interesado);

    // Prepara los datos para la solicitud POST
    const postData = {
      proposer: {
        email: interesadoData.email,
        fullName: interesadoData.fullName,
      },
      owner: {
        email: owner.email,
        fullName: owner.fullName,
      },
    };
    console.log(postData);

    // Llama a la función que maneja el envío del correo
    sendEmail(postData);
  };

  const sendEmail = async (postData) => {
    try {
      // Asume que tienes una ruta de API que maneja el envío de correos
      const response = await fetch("api/propose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      const loggedUser = await getUser(loggedUserId);
      loggedUser.chats.push(data.newChat._id);
      const otherUser = await getUser(post.owner);
      otherUser.chats.push(data.newChat._id);
      await updateUser(post.owner, otherUser);
      await updateUser(loggedUserId, loggedUser);
      console.log("loggedUser", loggedUser);
      Swal.fire({
        title: "Propuesta enviada!",
        icon: "success",
      }).then(() => {
        router.push(`/chats/${data.newChat._id}`);
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "UPS! Ocurrió un error en el envío de la propuesta.",
        icon: "error",
      });
    }
  };

  const handleFavorite = async () => {
    if (!loggedUserId) {
      router.push("/login");
      return;
    }
    const user = await getUser(loggedUserId);
    let icon = "success";
    let message = "Se agregó a Mis favoritos.";
    if (user.favorites.includes(post._id)) {
      user.favorites = user.favorites.filter((id) => id !== post._id);
      icon = "error";
      message = "Se eliminó de Mis favoritos.";
      setStar(false);
    } else {
      user.favorites.push(post._id);
      setStar(true);
    }
    await updateUser(loggedUserId, user);
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-right",
      showConfirmButton: false,
      timer: 1500,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: message,
    });
  };

  const eliminarPublicacion = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminada la publicación no podrás recuperarla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePost(id);
        Swal.fire("Eliminada!", "Tu publicación ha sido eliminada.", "success").then(() => {
          location.reload();
        });
      }
    });
  };

  const pausarPublicacion = async (id, newFields) => {
    newFields.state = post.state === "Pausado" ? "Activo" : "Pausado";
    await updatePost(id, newFields);
    window.location.reload();
  };


  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 duration-500 hover:scale-105">
      <div className="p-5 flex flex-col justify-between">
        <div className="flex justify-between mb-2">
          <a href="#">
            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words overflow-y-auto">
              {post.name}
            </h5>
          </a>
          <span className="text-2xl cursor-pointer" onClick={handleFavorite}>
            <Image src={star ? "/icons8-star.svg" : "/icons8-starWhite.svg"} alt="star" width={20} height={20}></Image>
          </span>
        </div>
        {showOwnerButtons && (
          <>
            <div className="flex mb-2">
              <div>Estado: </div>
              {post.state === "Activo" && <div className="text-green-700 font-semibold ml-1 mb-1"> Activo</div>}
              {post.state === "Pausado" && <div className="text-blue-400 font-semibold ml-1 mb-1"> Pausado</div>}
              {post.state === "Rechazado" && <div className="text-red-500 font-semibold ml-1 mb-1">Rechazado</div>}
            </div>
          </>
        )}
        <div className="relative mb-2">
          <Image src={post.image} alt="bora" width={300} height={300} className="rounded-xl h-48 object-cover" />
        </div>
        <div className="relative">
          <p
            ref={descriptionRef}
            className={`mb-4 font-normal w-full text-black dark:text-gray-400 break-words ${!isExpanded ? "fixed-height" : ""}`}
          >
            {post.description}
          </p>
          {needsTruncate && (
            <div className="button-container">
              <button onClick={handleExpandClick} className="text-gray-800 font-semibold text-sm">
                {isExpanded ? "Ver menos" : "Ver más"}
              </button>
            </div>
          )}
        </div>
          
        <div className="w-full mb-2 justify-center rounded-xl">
          <MapDisplay lat={post.latitud} lng={post.longitud}/>
        </div> 

        {showButton && showProposeButton && userType !== "Admin" && post.state !== "Pausado" && (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center mx-auto mb-2 mt-1 px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-xl duration-300 hover:bg-gray-700"
          >
            Proponer Intercambio
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        )}

        {post.state === "Pausado" && <p className="text-sm font-semibold mb-1 mx-auto">Esta publicacion se encuentra pausada</p>}

        {showOwnerButtons && (
          <div className="flex justify-between gap-2">
            <Button
              onClick={() => eliminarPublicacion(post._id)}
              className="inline-flex items-center px-1 py-1 text-md font-medium text-center text-white bg-red-700 rounded-3xl duration-300 hover:bg-red-600"
            >
              Eliminar
            </Button>
            <Button
              onClick={() => router.push(`/posts/modificar/${post._id}`)}
              className="inline-flex items-center px-1 py-1 text-md font-medium text-center text-white bg-blue-800 rounded-3xl duration-300 hover:bg-blue-700"
            >
              Editar
            </Button>

            <Button
              onClick={() => pausarPublicacion(post._id, post)}
              className="inline-flex items-center px-1 py-1 text-md font-medium text-center text-white bg-yellow-800 rounded-3xl duration-300 hover:bg-yellow-700"
            >
              {post.state === "Pausado" ? "Resumir" : "Pausar"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;

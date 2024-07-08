"use client";

import React from "react";
import Image from "next/image";
import ActionButton from "./ActionButton";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { createPost } from "@/app/services/posts.api";

const BoatCard = ({ boat }) => {
  const router = useRouter();

  const handlePublish = async () => {
    try {
      const post = {
        plate: boat.plate,
        name: boat.name,
        type: "Embarcaciones",
        description: boat.description,
        image: boat.image,
        adapted: boat.adapted,
        owner: boat.owner,
        state: "Activo",
        latitud: -34.92145,
        longitud: -57.95453,
      };

      const newPost = await createPost(post);
      if (!newPost) {
        throw new Error("Error al publicar la embarcación");
      }
      Swal.fire({
        icon: "success",
        title: "¡Listo!",
        text: "Se ha publicado la embarcación",
      });
      router.push("/posts");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 duration-500">
      <div className="p-5 flex flex-col justify-between">
        <div className="flex justify-between mb-2">
          <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words overflow-y-auto">
            {boat.name}
          </h5>
        </div>
        <div className="relative mb-2">
          <Image src={boat.image} alt="bora" width={300} height={300} className="rounded-xl h-48 object-cover" priority />
        </div>
        <div className="relative">
          <p className={"mb-4 font-normal w-full text-black dark:text-gray-400 break-words"}>{boat.description}</p>
        </div>
        <ActionButton text="Publicar embarcación" handleSubmit={handlePublish} />
      </div>
    </div>
  );
};

export default BoatCard;

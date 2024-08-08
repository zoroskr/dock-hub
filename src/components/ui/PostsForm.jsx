"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { createPost, updatePost } from "@/app/services/posts.api";
import { verifyUser } from "@/app/services/verify.api";
import Swal from "sweetalert2";
import { getUser } from "@/app/services/users.api";
import dynamic from "next/dynamic";
import FormButton from "./FormButton";
const Map = dynamic(() => import("@/components/ui/Map"), { ssr: false });

const PostsForm = ({
  post = {
    name: "",
    description: "",
    image: "",
    type: "",
    owner: "",
  },
  title,
}) => {
  const form = useRef(post);
  const params = useParams();
  const router = useRouter();
  // Dentro de PostsForm, agrega estos estados al principio del componente
  const [lat, setLat] = useState(-34.92145); // Valor inicial arbitrario
  const [lng, setLng] = useState(-57.95453); // Valor inicial arbitrario

  useEffect(() => {
    if (form.current) {
      form.current.elements.plate.value = post.plate || "";
      form.current.elements.name.value = post.name || "";
      form.current.elements.description.value = post.description || "";
      form.current.elements.image.value = post.image || "";
      form.current.elements.type.value = post.type || "";
      form.current.elements.isAdapted.checked = post.adapted || false;

    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    const urlRegex = /^(https?:\/\/)?(localhost(:3000)?|imgur\.com|i\.imgur\.com)\/[^\s/$.?#].[^\s]*$/i;
    let url = formData.get("image");
    if (!url) {
      url = "https://imgur.com/n4GiKsx.png";
    } else if (!urlRegex.test(url)) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa una URL válida, solo aceptamos imágenes alojadas en imgur.com, al pegar la URL de la imagen, asegúrate de que termine en .png, .jpg, .jpeg, .gif o .webp",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const newPost = {
      plate: formData.get("plate"),
      name: formData.get("name"),
      description: formData.get("description"),
      image: url,
      type: formData.get("type"),
      owner: localStorage.getItem("id"),
      state: "Activo",
      adapted: formData.get("isAdapted") === "on",
      latitud: lat,
      longitud: lng,
    };

    const owner = await getUser(newPost.owner);
    console.log("🚀 ~ handleSubmit ~ newPost.owner:", newPost.owner)
    
    const result = await verifyUser({ dni: owner.DNI, id_bien: newPost.plate });
    if (!result) {
      return;
    }

    try {
      if (params.id) {
        await updatePost(params.id, newPost);
        Swal.fire({
          title: "Éxito",
          text: "Publicación actualizada correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          router.push("/posts");
        });
      } else {
        await createPost(newPost);
        Swal.fire({
          title: "Éxito",
          text: "Publicación creada correctamente",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          router.push("/posts");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error al crear la publicación. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex justify-center mt-3 mb-3 items-center min-h-screen max-w-lg w-full">
      <form
        ref={form}
        className="flex w-full flex-col gap-3 rounded-xl bg-gray-900 border-gray-200 dark:bg-gray-900 shadow-md p-5 items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-white">{title}</h1>

        <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Plate" />
          </div>
          <div className="rounded-xl overflow-hidden">
            <TextInput name="plate" type="text" placeholder="Identificador único del bien" required shadow />
          </div>
        </div>

        <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nombre" />
          </div>
          <div className="rounded-xl overflow-hidden">
            <TextInput name="name" type="text" placeholder="Nombre del bien que vas a publicar" required shadow />
          </div>
        </div>
        <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Descripción" />
          </div>
          <Textarea
            name="description"
            placeholder="Descripción de las características!"
            required
            rows={3}
            className="rounded-xl"
          />
        </div>

        <div className="max-w-md w-full">
          <div className="mb-1 block">
            <Label htmlFor="image" value="Link a imagen" />
          </div>
          <TextInput
            className="rounded-xl overflow-hidden"
            name="image"
            type="url"
            placeholder="Link a la imagen del bien"
          />
        </div>

        <div className="max-w-md mx-auto">
          <div className="mb-2 block">
            <Label htmlFor="type" value="Selecciona el tipo de bien" className="text-white" />
          </div>
          <Select name="type" id="type" className="custom-select" required>
            <option>Vehículos</option>
            <option>Aeronaves</option>
            <option>Inmuebles</option>
          </Select>
        </div>
        <div className="max-w-md">
          <input
            type="checkbox"
            id="isAdapted"
            name="isAdapted"
            className="text-blue-500 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-blue-500 dark:shadow-sm-light"
          />
          <label htmlFor="isAdapted" className="text-white dark:text-white font-semibold text-sm">
            Está adaptado para personas con capacidad disminuida
          </label>
        </div>

        <Map
          lat={lat}
          lng={lng}
          onPositionChange={(newLat, newLng) => {
            setLat(newLat);
            setLng(newLng);
          }}
        />

        <FormButton text={title} />
      </form>
    </div>
  );
};

export default PostsForm;

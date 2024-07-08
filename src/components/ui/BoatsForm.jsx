"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";
import { createBoat, updateBoat } from "@/app/services/boats.api";
import { verifyUser } from "@/app/services/verify.api";
import Swal from "sweetalert2";
import { getUser, updateUser } from "@/app/services/users.api";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/ui/Map"), { ssr: false });

const BoatsForm = ({
  boat = {
    plate: "",
    name: "",
    type: "",
    description: "",
    image: "",
    owner: "",
    adapted: false,
    latitud: -34.92145,
    longitud: -57.95453,
  },
  title,
}) => {
  const form = useRef(boat);
  const params = useParams();
  const router = useRouter();
  // Dentro de PostsForm, agrega estos estados al principio del componente
  const [lat, setLat] = useState(-34.92145); // Valor inicial arbitrario
  const [lng, setLng] = useState(-57.95453); // Valor inicial arbitrario

  useEffect(() => {
    if (form.current) {
      form.current.elements.plate.value = boat.plate || "";
      form.current.elements.name.value = boat.name || "";
      // form.current.elements.type.value = boat.type || "";
      form.current.elements.description.value = boat.description || "";
      form.current.elements.image.value = boat.image || "";
      form.current.elements.isAdapted.checked = boat.adapted || false;
    }
  }, [boat]);

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

    const newBoat = {
      plate: formData.get("plate"),
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      image: url,
      adapted: formData.get("isAdapted") === "on",
      owner: localStorage.getItem("id"),
      latitud: lat,
      longitud: lng,
    };

    try {
      const owner = await getUser(newBoat.owner);

      const result = await verifyUser({ dni: owner.DNI, id_bien: newBoat.plate });
      if (!result) {
        return;
      }
      const createdBoat = await createBoat(newBoat);
      await updateUser(owner._id, { boats: [...owner.boats, createdBoat._id] });
      Swal.fire({
        title: "Éxito",
        text: "Embarcación creada correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        router.push("/boats");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error al crear la embarcación. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen max-w-lg w-full">
      <form
        ref={form}
        className="flex w-full flex-col gap-4 rounded-xl bg-gray-900 border-gray-200 dark:bg-gray-900 shadow-md p-7 items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-white">{title}</h1>

        <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Plate" />
          </div>
          <div className="rounded-xl overflow-hidden">
            <TextInput name="plate" type="text" placeholder="Patente de la embarcacion" required shadow />
          </div>
        </div>

        <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nombre" />
          </div>
          <div className="rounded-xl overflow-hidden">
            <TextInput name="name" type="text" placeholder="Nombre de la embarcacion" required shadow />
          </div>
        </div>

        {/* <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="type" value="Tipo" />
          </div>
          <div className="rounded-xl overflow-hidden">
            <TextInput name="type" type="text" placeholder="Tipo de embarcacion" required shadow />
          </div>
        </div> */}

        <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Descripción" />
          </div>
          <Textarea
            name="description"
            placeholder="Descripción de las características"
            required
            rows={4}
            className="rounded-xl"
          />
        </div>

        <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="image" value="Link a imagen" />
          </div>
          <TextInput
            className="rounded-xl overflow-hidden"
            name="image"
            type="url"
            placeholder="Link a la imagen del bien"
          />
        </div>

        <div className="max-w-md">
          <input
            type="checkbox"
            id="isAdapted"
            name="isAdapted"
            className="text-blue-500 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-blue-500 dark:shadow-sm-light"
          />
          <label htmlFor="isAdapted" className="text-white dark:text-white font-semibold">
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
        <Button
          type="submit"
          className="bg-custom-yellow text-black rounded-xl border-gray-900 duration-500 hover:scale-105"
        >
          {title}
        </Button>
      </form>
    </div>
  );
};

export default BoatsForm;

"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/services/users.api";
import Swal from "sweetalert2";
import FormButton from "./FormButton";

const UserForm = ({ user, title, userId }) => {
  const router = useRouter(); // Hook useRouter para redirigir
  const form = useRef(user);

  useEffect(() => {
    if (form.current) {
      form.current.elements.fullName.value = user.fullName || "";
      form.current.elements.address.value = user.address || "";
      form.current.elements.password.value = user.password || "";
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    const user = {
      fullName: formData.get("fullName"),
      address: formData.get("address"),
      password: formData.get("password"),
    };

    try {
      const result = await updateUser(userId, user);
      if (!result) {
        throw new Error("No se pudo actualizar el usuario");
      }
      Swal.fire({
        icon: "success",
        title: "¡Actualización exitosa!",
      }).then(() => {
        router.push("/"); // Redirgir al home después de actualizar
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-16 mb-16">
      <div className="max-w-lg w-full bg-gray-900 rounded-xl p-6">
        <form ref={form} className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
            {title}
          </h1>
          <div className="mb-5 mt-3">
            <label for="fullname" className="block mb-2 text-sm font-medium text-white dark:text-white">
              Nombre
            </label>
            <input
              type="text"
              id="fullname"
              name="fullName" // Add this line
              className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-5">
            <label for="address" className="block mb-2 text-sm font-medium text-white dark:text-white">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="123 Main St, New York, NY 10030"
              required
            />
          </div>

          <div className="mb-5">
            <label for="password" className="block mb-2 text-sm font-medium text-white dark:text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>

          <FormButton text={title} />
        </form>
      </div>
    </div>
  );
};

export default UserForm;

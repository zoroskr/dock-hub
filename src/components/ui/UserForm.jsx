"use client";
import React, { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  createUser,
  updateUser,
  getUserByEmail,
} from "@/app/services/users.api";

import Swal from "sweetalert2";

const UserForm = ({ user, title, userId = false }) => {
  const form = useRef(user);
  const params = useParams();
  const router = useRouter(); 

  useEffect(() => {
    if (form.current) {
      form.current.elements.fullName.value = user.fullName || "";
      form.current.elements.DNI.value = user.DNI || "";
      form.current.elements.address.value = user.address || "";
      form.current.elements.email.value = user.email || "";
      form.current.elements.password.value = user.password || "";
      form.current.elements["repeat-password"].value = user.password || "";
      form.current.elements.isOwner.checked = user.isOwner || false;
    }
  }, [user]);

  const handleSubmit = async (e) => {
    console.log("form", form.current);
    e.preventDefault();

    const formData = new FormData(form.current);
    let t;
    if (formData.get("isOwner")) {
      t = "Titular";
    } else {
      t = "Regular";
    }

    const user = {
      fullName: formData.get("fullName"),
      DNI: formData.get("DNI"),
      address: formData.get("address"),
      email: formData.get("email"),
      password: formData.get("password"),
      type: t,
      verified: false,
    };
    console.log("user", user);

    if (formData.get("password") !== formData.get("repeat-password")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coninciden!",
      });
      return;
    }

    let usuarioExistente = false;
    usuarioExistente = await getUserByEmail(formData.get("email"));
    console.log("userId", userId);

    if (usuarioExistente && !userId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El email ya está registrado!",
      });
      return;
    }

    let message = "¡Registro exitoso!";

    try {
      if (userId) {
        user._id = userId;
        await updateUser(user._id, user);
        message = '¡Actualización exitosa!';
      } else {
        const newUser = await createUser(user);
        localStorage.setItem('id', newUser._id);
      }

      Swal.fire({
        icon: 'success',
        title: message,
      }).then(() => {
        // Redirigir al home después de mostrar el mensaje
        router.push('/');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
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
            <label
              for="fullname"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
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
            <label
              for="DNI"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              DNI
            </label>
            <input
              type="number"
              id="DNI"
              name="DNI"
              className="shadow-sm text-black text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="12345678"
              required
            />
          </div>

          <div className="mb-5">
            <label
              for="address"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
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
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="tuemail@example.com"
              readOnly={userId}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Edad
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="18"
              className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>

          <div className="mb-5">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
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
          <div className="mb-5">
            <label
              for="repeat-password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Repetir contraseña
            </label>
            <input
              type="password"
              id="repeat-password"
              name="repeat-password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-black text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isOwner"
                name="isOwner"
                disabled={userId}
                className="text-blue-500 rounded-xl focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-blue-500 dark:shadow-sm-light"
              />
              <label
                for="isOwner"
                className="text-white dark:text-white font-semibold"
              >
                Soy cliente en Yate Mate
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="text-black  bg-custom-yellow duration-300 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {title}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

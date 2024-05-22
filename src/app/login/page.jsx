"use client";
import React, { useRef } from "react";
import Link from "next/link";

import Swal from 'sweetalert2';
import { getUserByEmail } from "../services/users.api";

export default function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const user = await getUserByEmail(email);

    if (user && user.email === email && user.password === password) {
      // console.log("Inicio de sesión exitoso:", data);
      localStorage.setItem('id', user._id);
      localStorage.setItem('type', user.type);
      localStorage.setItem('verified', user.verified);
      window.location.href = '/';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email o contraseña incorrectos!',
      });
      return;
      // console.log("Error en el inicio de sesión:", response.statusText);
    }

  };

  return (
    <section class="bg-rgb-190-175-85  dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full md:max-w-md lg:max-w-md xl:max-w-lg bg-gray-900 rounded-xl shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Iniciar sesión
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="pancracio@example.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <button
                type="submit"
                class="w-full text-black bg-custom-yellow hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center"
              >
                Iniciar sesión
              </button>
              <p class="text-sm font-light text-white dark:text-gray-400">
                No tienes una cuenta?{" "}
                <Link
                  href="/register"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Regístrate!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

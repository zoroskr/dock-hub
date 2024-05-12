"use client";
import React, { useRef } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

import Swal from 'sweetalert2';

export default function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await fetch("http://localhost:3000/api/auth/register");
    const data = await response.json();

    const user = data.find(user => user.email === email && user.password === password);

    if (user && user.email === email && user.password === password) {
      // console.log("Inicio de sesión exitoso:", data);
      localStorage.setItem('id', user._id);
      router.push('/'); // Redirige a la página de inicio
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
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Iniciar sesión
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="pancracio@example.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {/* <div class="flex items-center justify-between">
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div> */}
              <button
                type="submit"
                class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Iniciar sesión
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                No tienes una cuenta?{" "}
                <Link
                  href="/register"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Registrarse
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React, { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

import { createUser, updateUser, getUser, getUserByEmail } from '@/app/services/users.api';

import Swal from 'sweetalert2'

const UserForm = ({ user, title }) => {
  const form = useRef(user);
  const params = useParams();

  useEffect(() => {
    if (form.current) {
      form.current.elements.fullName.value = user.fullName || '';
      form.current.elements.address.value = user.address || '';
      form.current.elements.email.value = user.email || '';
      form.current.elements.password.value = user.password || '';
      form.current.elements['repeat-password'].value = user.password || '';
    }
  }, [user]);

  const handleSubmit = async (e) => {
    console.log("form", form.current);
    e.preventDefault();

    const formData = new FormData(form.current);

    const user = {
      fullName: formData.get('fullName'),
      address: formData.get('address'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    if (formData.get('password') !== formData.get('repeat-password')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coninciden!',
      });
      return;
    }

    console.log("formData.get('email')", formData.get('email'));

    let usuarioExistente = false;
    usuarioExistente = await getUserByEmail(formData.get('email'));

    if (usuarioExistente) {
      if (!params.id || (params.id && usuarioExistente._id !== params.id)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El email ya está registrado!',
        });
        return;
      }
    }

    if (params.id) {
      user._id = params.id;
      await updateUser(user);
      Swal.fire({
        icon: 'success',
        title: '¡Actualización exitosa!',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      const newUser = await createUser(user);
      localStorage.setItem('id', newUser._id);
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        showConfirmButton: false,
        timer: 1500
      });
    }

  };

  return (
    <form ref={form} class="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {title}
      </h1>
      <div class="mb-5">
        <label
          for="fullname"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre
        </label>
        <input
          type="text"
          id="fullname"
          name="fullName" // Add this line
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="John Doe"
          required
        />
      </div>

      <div class="mb-5">
        <label
          for="address"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Dirección
        </label>
        <input
          type="text"
          id="address"
          name="address"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="123 Main St, New York, NY 10030"
          required
        />
      </div>

      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="tuemail@example.com"
          required
        />
      </div>

      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="repeat-password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Repetir contraseña
        </label>
        <input
          type="password"
          id="repeat-password"
          name="repeat-password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {title}
      </button>
    </form>
  );
}

export default UserForm;
"use client";
import React, { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { createUser, getUserByEmail } from '@/app/services/users.api';

import Swal from 'sweetalert2'

const UserForm = ({ user, title, userId = false }) => {
  const router = useRouter(); // Hook useRouter para redirigir

  async function updateUser(userId, user) {
    const response = await fetch(`/api/auth/register`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }
  
    return await response.json();
  }

  const form = useRef(user);
  const params = useParams();

  useEffect(() => {
    if (form.current) {
      form.current.elements.fullName.value = user.fullName || '';
      form.current.elements.address.value = user.address || '';
      form.current.elements.password.value = user.password || '';
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(form.current);
  
    const user = {
      fullName: formData.get('fullName'),
      address: formData.get('address'),
      password: formData.get('password'),
    }
  
    let message = '¡Registro exitoso!';
  
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
      router.push('/'); // Redirigir al home después de la actualización
    });
  }

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
}

export default UserForm;
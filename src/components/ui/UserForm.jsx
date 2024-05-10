"use client";
import React, { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

const UserForm = ( {user} ) => {
  const form = useRef(user);
  const params = useParams();

  useEffect(() => {
    if (form.current) {
      form.current.elements.fullName.value = user.fullName || '';
      form.current.elements.address.value = user.address || '';
      form.current.elements.email.value = user.email || '';
      form.current.elements.password.value = user.password || '';
    }
  }, [user]);

  const handleSubmit = async (e) => {
    console.log("form", form.current);
    e.preventDefault();

    const formData = new FormData(form.current);

    if (formData.get('password') !== formData.get('repeat-password')) {
      alert('Passwords do not match');
      return;
    }

    const user = {
      fullName: formData.get('fullName'),
      address: formData.get('address'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    const createUser = async () => {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);
    };

    const updateUser = async () => {
      const response = await fetch(`http://localhost:3000/api/auth/update/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);
    };

    console.log("usuariooooooooo", user);
    if (params.id) {
      await updateUser();
    } else {
      await createUser();
    }

  };

  return (
    <form ref={form} class="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div class="mb-5">
        <label
          for="fullname"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Full Name
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
          Your Address
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
          Your email
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
          Your password
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
          Repeat password
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
        Save
      </button>
    </form>
  );
}

export default UserForm;
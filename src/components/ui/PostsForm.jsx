'use client'
import React, { useRef } from 'react';
import { FileInput, Button, Label, TextInput, Textarea } from "flowbite-react";
import Swal from 'sweetalert2';

const PostsForm = () => {

  const form = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    const post = {
      name: formData.get('name'),
      description: formData.get('description'),
      image: formData.get('image'),
      owner: localStorage.getItem('id'),
    }

    if (!localStorage.getItem('id')) {
      Swal.fire({
        title: 'Error',
        text: 'Debes estar logueado para cargar un bien',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const response = await fetch('http://localhost:3000/api/bienes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        title: 'Carga exitosa!',
        text: 'Estado: Revisión',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      console.log(data);
    } else {
      console.error('Error al cargar los datos:', response.statusText);
    }
    
  }

  return (
    <div className="flex justify-center items-center min-h-screen max-w-lg w-full">
      <form ref={form} className="flex w-full flex-col gap-4 rounded-xl bg-gray-900 border-gray-200 dark:bg-gray-900 shadow-md p-7 items-center" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-white">Cargar un bien</h1>
        <div className='max-w-md w-full'>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nombre"/>
          </div>
          <div className="rounded-xl overflow-hidden">
            <TextInput
              name="name"
              type="text"
              placeholder="Nombre del bien que vas a publicar"
              required
              shadow
            />
          </div>

        </div>
        <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Descripción" />
          </div>
          <Textarea name="description" placeholder="Descripción de las características!" required rows={4} className='rounded-xl'  />
        </div>

        <div className="max-w-md w-full">
          <div className="mb-2 block">
            <Label htmlFor="image" value="Link a imagen" />
          </div>
          <Textarea name="image" placeholder="Enlace a imagen" required rows={4} className='rounded-xl'/>
        </div>

        <Button type="submit" className="bg-custom-yellow text-black rounded-xl border-gray-900 duration-500 hover:scale-105">Cargar un bien</Button>
      </form>
    </div>
  );
}


export default PostsForm
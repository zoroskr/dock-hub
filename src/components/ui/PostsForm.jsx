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
    <form ref={form} className="flex max-w-md flex-col gap-4 bg-slate-50 rounded-xl p-7 px-14" onSubmit={handleSubmit} >
      <h1 className="text-2xl font-bold">Cargar un bien</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Nombre" />
        </div>
        <TextInput name="name" type="text" placeholder="Rolls-Royce Phantom" required shadow />
      </div>

      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Descripción" />
        </div>
        <Textarea name="description" placeholder="Puro lujo..." required rows={4} />
      </div>

      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="image" value="Link a imagen" />
        </div>
        <Textarea name="image" placeholder="Enlace a imagen" required rows={4} />
      </div>

      <Button type="submit" className='bg-black'>Cargar un bien</Button>
    </form>
  );
}


export default PostsForm
'use client'
import React, { useRef } from 'react';
import { FileInput, Button, Label, TextInput, Textarea } from "flowbite-react";

const PublicationForm = () => {

  const form = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form.current);

    const publcation = {
      name: formData.get('name'),
      anio: formData.get('anio'),
      description: formData.get('description'),
      file: formData.get('file')
    }

    console.log(publcation);

    const response = await fetch('http://localhost:3000/api/publications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publcation),
    });

    const data = await response.json();
    console.log(data);
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
      <div>
        <div className="mb-2 block">
          <Label htmlFor="anio" value="Año" />
        </div>
        <TextInput name="anio" type="number" placeholder='2024' required shadow />
      </div>

      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Descripción" />
        </div>
        <Textarea name="description" placeholder="Puro lujo..." required rows={4} />
      </div>


      <div id="fileUpload" className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="file" value="Subir foto" />
        </div>
        <FileInput name="file" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." />
      </div>

      <Button type="submit" className='bg-black'>Cargar un bien</Button>
    </form>
  );
}


export default PublicationForm
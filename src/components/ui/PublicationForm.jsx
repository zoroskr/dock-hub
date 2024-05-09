import React from 'react'
import { FileInput, Button, Label, TextInput, Textarea } from "flowbite-react";

const handleSubmit = async (event) => {
  event.preventDefault();

  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: event.target.name.value,
      anio: event.target.anio.value,
      description: event.target.description.value,
      file: event.target.file.value
    }),
  });

  const data = await response.json();
  console.log(data);
}

const PublicationForm = () => {
  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit} >
      <h1 className="text-2xl font-bold">Cargar un bien</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Nombre" />
        </div>
        <TextInput id="name" type="text" placeholder="Rolls-Royce Phantom" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="anio" value="Año" />
        </div>
        <TextInput id="anio" type="number" placeholder='2024' required shadow />
      </div>

      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="description" value="Descripción" />
        </div>
        <Textarea id="description" placeholder="Puro lujo..." required rows={4} />
      </div>


      <div id="fileUpload" className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="file" value="Subir foto" />
        </div>
        <FileInput id="file" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." />
      </div>

      <Button type="submit" className='bg-black'>Cargar un bien</Button>
    </form>
  );
}


export default PublicationForm
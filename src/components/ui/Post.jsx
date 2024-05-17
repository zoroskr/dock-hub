"use client";

import React from 'react'
import Image from 'next/image'
import { sendEmail } from '@/lib/mail'
import { getUser } from '@/app/services/users.api';
import Swal from 'sweetalert2';

const Post = ({ post , showProposeButton}) => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const owner = await getUser(post.owner);
    const interesado = localStorage.getItem('id');
    const interesadoData = await getUser(interesado);

    const emailDetails = {
      to: owner.email,
      from: interesadoData.email,
      subject: 'Hola me interesa tu publicación!',
      message: 'Hola, me interesa tu publicación. Me gustaría proponerte un intercambio. ¿Podemos hablar? http://localhost:3000/',
    };

    try {
      await sendEmail(emailDetails);
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Tu propuesta de intercambio ha sido enviada al dueño de la publicación. ¡Buena suerte!',
      });
      console.log('Email sent successfully!');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al enviar el correo',
      });
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 duration-500 hover:scale-105">
      <a href="#">
        <img className="rounded-t-lg" src="#" alt="" />
      </a>
      <div className="p-5 flex flex-wrap justify-between">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words overflow-y-auto">{post.name}</h5>
        </a>
        <div className="mb-4">
          <Image src={post.image} alt='bora' width={300} height={300} className='rounded-xl' />
        </div>
        <p className="mb-3 font-normal w-full text-black dark:text-gray-400 break-words overflow-y-auto">{post.description}</p>
        { showProposeButton ? (
          <button onClick={handleSubmit} className="inline-flex items-center mx-auto px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-xl duration-300 hover:bg-gray-700">
          Proponer Intercambio
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
          </button>) : (
            <div className="flex flex-col gap-2">
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-xl duration-300 hover:bg-red-600">
                Eliminar Publicación
              </a>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-xl duration-300 hover:bg-blue-700">
                Editar Publicación
              </a>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-800 rounded-xl duration-300 hover:bg-yellow-700">
                Pausar Publicación
              </a>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Post
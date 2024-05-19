"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { sendEmail } from '@/lib/mail'
import { getUser } from '@/app/services/users.api';
import Swal from 'sweetalert2';
import { Button } from 'flowbite-react';
import { deletePost, updatePost } from '@/app/services/posts.api';
import { useRouter} from 'next/navigation';

const Post = ({ post , showProposeButton}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncate, setNeedsTruncate] = useState(false);
  const router = useRouter();
  const descriptionRef = React.useRef(null);
  
  React.useEffect(() => {
    if (descriptionRef.current) {
      setNeedsTruncate(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [post.description]);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

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

  const eliminarPublicacion = async (id) => {
    console.log('id', id);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Una vez eliminada la publicación no podrás recuperarla",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePost(id);
        Swal.fire(
          'Eliminada!',
          'Tu publicación ha sido eliminada.',
          'success'
        )
      }
    })
  }

  const pausarPublicacion = async (id, newFields) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Una vez pausada la publicación no podrá ser vista por otros usuarios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, pausar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updatePost(id, newFields);
        Swal.fire(
          'Pausada!',
          'Tu publicación ha sido pausada.',
          'success'
        )
      }
    })
  }

  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 duration-500 hover:scale-105">
      <a href="#">
        <img className="rounded-t-lg" src="#" alt="" />
      </a>
      <div className="p-5 flex flex-col justify-between">
        <a href="#">
            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words overflow-y-auto">{post.name}</h5>
        </a>
        <div className='flex mb-2'>
          <div>Estado: </div>
          {post.state === 'Aprobado' && (
            <div className='text-green-700 font-semibold ml-1 mb-1'> Aprobado</div>
          )}
          {post.state === 'Pendiente' && (
            <div className='text-yellow-500 font-semibold ml-1 mb-1'> Pendiente</div>
          )}
          {post.state === 'Rechazado' && (
            <div className='text-red-500 font-semibold ml-1 mb-1'>Rechazado</div>
          )}
        </div>
        <div className="mb-2">
          <Image src={post.image} alt='bora' width={300} height={300} className='rounded-xl' />
        </div>
        <div className="relative">
          <p
            ref={descriptionRef}
            className={`mb-4 font-normal w-full text-black dark:text-gray-400 break-words ${!isExpanded ? 'fixed-height' : ''}`}
          >
            {post.description}
          </p>
          {needsTruncate && (
            <div className="button-container">
              <button onClick={handleExpandClick} className="text-gray-800 font-semibold text-sm">
                {isExpanded ? 'Ver menos' : 'Ver más'}
              </button>
            </div>
          )}
        </div>
        { showProposeButton ? (
          <button onClick={handleSubmit} className="inline-flex items-center mx-auto px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-xl duration-300 hover:bg-gray-700">
          Proponer Intercambio
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
          </button>) : (
            <div className="flex gap-2">
              <Button onClick={() => eliminarPublicacion(post._id)} className="inline-flex items-center px-2 py-2 text-md font-medium text-center text-white bg-red-700 rounded-3xl duration-300 hover:bg-red-600">
                Eliminar
              </Button>
              <Button onClick={() => router.push(`/posts/modificar/${post._id}`)} className="inline-flex items-center px-2 py-2 text-md font-medium text-center text-white bg-blue-800 rounded-3xl duration-300 hover:bg-blue-700">
                Editar
              </Button>
              <Button onClick={() => pausarPublicacion(post._id, post)} className="inline-flex items-center px-2 py-2 text-md font-medium text-center text-white bg-yellow-800 rounded-3xl duration-300 hover:bg-yellow-700">
                Pausar
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Post
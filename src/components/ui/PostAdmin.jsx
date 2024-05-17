import React from 'react'
import Image from 'next/image'
import { Button } from 'flowbite-react'

import { updatePost, deletePost } from '@/app/services/posts.api'

const Publicacion = ({ post, user }) => {

  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5 flex flex-wrap justify-between">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.name}</h5>
        </a>
        <div className="mb-4">
          <Image src={post.image} alt='bora' width={300} height={300} className='rounded-xl' />
        </div>
        <p className="mb-3 font-normal text-black dark:text-gray-400">{post.description}</p>

        <section>
          <h5 className="text-xl font-bold">Datos del Usuario</h5>
          <ul>
            <li>Nombre: {user.fullName}</li>
            <li>DNI: {user.DNI}</li>
            <li>Email: {user.email}</li>
            <li>Dirección: {user.address}</li>
            {/* <li>Teléfono: {user.phone}</li> */}
            {/* <li>Fecha de Publicación: {post.createdAt}</li> */}
          </ul>
        </section>

        <Button onClick={() => updatePost(post._id, { ...post, verified: true })} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-xl duration-300 hover:scale-105">
          Aprobar Publicación
        </Button>
        <Button onClick={() => deletePost(post._id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-xl duration-300 hover:scale-105">
          Denegar Publicación
        </Button>
      </div>
    </div>
  )
}

export default Publicacion
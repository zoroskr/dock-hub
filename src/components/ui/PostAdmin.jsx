import React from 'react'
import Image from 'next/image'
import { Button } from 'flowbite-react'

import { updatePost, deletePost } from '@/app/services/posts.api'

const Publicacion = ({ post, user }) => {

  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 duration-500 hover:scale-105">
  <div className="p-5 flex flex-col space-y-4">
    <a href="#">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words overflow-y-auto">{post.name}</h5>
    </a>
    <div className="items-center">
      <Image src={post.image} alt='bora' width={300} height={300} className='rounded-xl' />
    </div>
    <div className='flex'>
      <div className='h-full overflow-y-auto p-2'>
        <p className="font-normal text-black dark:text-gray-400 break-words">{post.description}</p>
      </div>
      <section className='p-2'>
        <h5 className="text-xl font-bold">Datos del Usuario</h5>
        <ul>
          <li>Nombre: {user.fullName}</li>
          <li>DNI: {user.DNI}</li>
          <li>Email: {user.email}</li>
          <li>Dirección: {user.address}</li>
        </ul>
      </section>
    </div>
    <div className='flex gap-3'>
      <Button onClick={() => updatePost(post._id, { ...post, verified: true })} className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-gray-200 bg-gray-800 rounded-xl duration-300 hover:bg-green-600">
        Aprobar Publicación
      </Button>
      <Button onClick={() => deletePost(post._id)} className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-gray-200 bg-gray-800 rounded-xl duration-300 hover:bg-red-700">
        Denegar Publicación
      </Button>
    </div>
  </div>
</div>  
  )
}

export default Publicacion
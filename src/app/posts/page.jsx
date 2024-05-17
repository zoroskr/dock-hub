'use client';
import React, { useEffect, useState } from 'react'
import Post from '@/components/ui/Post'
import { Link } from 'next/link'
import NotFound from '../not-found';

const page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerPosts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/bienes')
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerPosts().then(data => {
      setPosts(data)
      setLoading(false)
    });
  }, []);

  return (
    <>
        <div className='flex flex-col items-center gap-14 min-h-screen w-full'>
          <h1 className='text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white p-6 '>Mis publicaciones</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {loading 
              ? <span className='text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium'>Cargando Publicaciones...</span> 
              : posts.length > 0 
                ? posts.map(post => (
                  <div className="p-2" key={post._id}>
                    <Post post={post} showProposeButton={true} />
                  </div>
                ))
                : <span className='text-2xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium'>No tienes publicaciones</span>
            }
          </div>
          <a href='/publicar' className='text-gray-100 bg-gray-900 rounded-xl text-xl font-medium p-2 duration-300 hover:scale-105'>Crear Publicación</a>
        </div>
    </>
  )
}

export default page
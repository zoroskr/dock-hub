'use client';
import React, { useEffect, useState } from 'react'
import Post from '@/components/ui/Post'
import { Link } from 'next/link'
import NotFound from '../not-found';

const page = () => {
  const [posts, setPosts] = useState([]);

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
    obtenerPosts().then(data => setPosts(data))
    console.log(posts)
  }, [])

  return (
    <>
        <div className='flex flex-col items-center gap-14 min-h-screen w-full'>
          <h1 className='text-3xl font-bold leading-none tracking-tight text-gray-950 md:text-5xl lg:text-6xl dark:text-white p-6'>Mis publicaciones</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {
              posts.length > 0 ? posts.map(post => <Post key={post._id} post={post} />) : <span className='text-3xl mt-auto mb-auto text-left p-3' >Usted no tiene ninguna publicación</span>
            }
          </div>
          <a href='/publicar' className='text-gray-100 bg-gray-900 rounded-xl text-xl p-2 duration-500 hover:scale-105'>Crear Publicación</a>
        </div>
    </>
  )
}

export default page
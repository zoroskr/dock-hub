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
      <h1 className='text-3xl font-bold text-center'>Posts</h1>
      <a href='/publicar' className='text-center text-white bg-blue-500 p-2 rounded-lg mt-4'>Crear Post</a>
      <div>
        {
          posts.length > 0 ? posts.map(post => <Post key={post._id} post={post} />) : <span className='text-3xl font-bold' >Usted no tiene ninguna publicación</span>
        }
      </div>
    </>
  )
}

export default page
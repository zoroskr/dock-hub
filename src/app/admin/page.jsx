'use client';
import React, { useEffect, useState } from 'react'
import PostAdmnin from '@/components/ui/PostAdmin';
import Loading from '../loading';
import { getUser } from '../services/users.api';

const page = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchData = async () => {
      const posts = await obtenerPosts()
      const id = localStorage.getItem('id')
      const user = await getUser(id)
      setPosts(posts)
      setUser(user)
      setIsLoading(false)
    }

    fetchData()
  }, []);

  return (
    <>
      {
        !isLoading ?
          <div className='flex flex-col items-center gap-14 min-h-screen w-full'>
            <h1 className='text-3xl font-bold leading-none tracking-tight text-gray-950 md:text-5xl lg:text-6xl dark:text-white p-6'>Aceptar Publicaciones</h1>
            <div className="flex flex-wrap justify-center gap-4">
              {
                posts.length > 0 ? posts.map(post => <PostAdmnin key={post._id} post={post} user={user} />) :
                  <span className='text-3xl mt-auto mb-auto text-left p-3' >Usted no tiene ninguna publicación</span>
              }
            </div>
          </div> : <Loading />
      }
    </>
  )
}

export default page
"use client";

import React, { useEffect, useState } from 'react';
import Post from '@/components/ui/Post'
import { Link } from 'next/link'

export default function Home() {
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
      <div className="max-w-screen-xl flex flex-wrap justify-between">
        <div className="w-1/5 p-2 sticky top-0 h-screen flex items-center">
          {/* Aquí va el video */}
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <video src="/yateMate.mp4" autoPlay muted loop className="object-cover rounded-xl " width="320" height="180" />
          </div>
        </div>
        <div className="w-4/5 p-2 grid grid-cols-3 gap-4">
        {loading 
          ? <span className='text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium'>Cargando Publicaciones...</span> 
          : posts.length > 0 
            ? posts.map(post => (
              <div className="p-2" key={post._id}>
                <Post post={post} showProposeButton={true} />
              </div>
            ))
            : <span className='text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium'>No hay publicaciones disponibles</span>
        }
        </div>
    </div>
  );
}

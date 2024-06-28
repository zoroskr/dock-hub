'use client';
import React, { useEffect, useState } from 'react'
import Post from '@/components/ui/Post'
import Title from '@/components/ui/Title';

const page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const obtenerPosts = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/bienes')
      let data = await res.json()
      data = data.filter(p => p.owner === localStorage.getItem('id'));
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    obtenerPosts();
  }, []);


  return (
    <>
      <div className='flex flex-col items-center gap-14 min-h-screen w-full'>
        <Title text='Mis Publicaciones' />
        <div className="flex flex-wrap justify-center gap-4">
          {loading 
            ? <span className='text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium'>Cargando Publicaciones...</span> 
            : posts.length > 0 
              ? posts.map(post => (
                <div className="p-2" key={post._id}>
                  <Post post={post} title="Cargar un bien" showProposeButton={false} />
                </div>
              ))
              : <span className='text-2xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium'>No tienes publicaciones</span>
          }
        </div>
      </div>
    </>
  );
}

export default page
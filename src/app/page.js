"use client";

import React, { useEffect, useRef, useState } from 'react';
import Post from '@/components/ui/Post'
import { getPosts } from './services/posts.api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('No hay publicaciones disponibles');

  const form = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setPosts(posts);
      setLoading(false);
      console.log('useeffct:', posts);
    }
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let defaultSearch;

    if (form.current) {
      defaultSearch = form.current.elements['default-search'].value;
      console.log('Form submitted', defaultSearch);
    }

    if (defaultSearch == '') {
      const posts = await getPosts();
      setPosts(posts);
      return;
    }
    
    const postsFiltered = posts.filter(p => p.name.includes(defaultSearch) || p.description.includes(defaultSearch));
    if (postsFiltered.length === 0) {
      setMessage('No se encuentran resultados relacionados');
    }

    setPosts(posts.filter(p => p.name.includes(defaultSearch) || p.description.includes(defaultSearch)));
    console.log('Form submitted', form.current);
  }
  // Filtrar los posts aprobados
  const approvedPosts = posts.filter(post => post.aproved === 1);

  return (
    <>  
      <form className="w-1/2 ml-auto mr-auto p-3" onSubmit={handleSubmit} ref={form}>   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative rounded-xl bg-custom-gray">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" id="default-search" 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-words overflow-y-auto" 
            placeholder="Buscar Embarcaciones, Amarras..."
          />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 rounded-xl bg-gray-800 duration-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
        </div>
    </form>

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
            : <span className='text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium'>{message}</span>
        }
        </div>
    </div>
  </>
  );
}

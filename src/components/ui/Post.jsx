"use client";

import React from 'react'
import Image from 'next/image'

const Post = ({ post , showProposeButton}) => {
  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 duration-500 hover:scale-105">
      <a href="#">
        <img className="rounded-t-lg" src="#" alt="" />
      </a>
      <div className="p-5 flex flex-wrap justify-between">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white break-words overflow-y-auto">{post.name}</h5>
        </a>
        <div className="mb-4">
          <Image src={post.image} alt='bora' width={300} height={300} className='rounded-xl' />
        </div>
        <p className="mb-3 font-normal w-full text-black dark:text-gray-400 break-words overflow-y-auto">{post.description}</p>
        { showProposeButton ? (
          <a href="#" className="inline-flex items-center mx-auto px-3 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-xl duration-300 hover:bg-gray-700">
          Proponer Intercambio
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
          </a>) : (
            <div className="flex flex-col gap-2">
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-xl duration-300 hover:bg-red-600">
                Eliminar Publicación
              </a>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-xl duration-300 hover:bg-blue-700">
                Editar Publicación
              </a>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-800 rounded-xl duration-300 hover:bg-yellow-700">
                Pausar Publicación
              </a>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Post
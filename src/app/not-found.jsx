import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 text-center'>
      <h1 className='text-6xl font-bold text-gray-800 mb-4'>Not Found 404</h1>
      <p className='text-2xl text-gray-800 mb-8'>Esta no es la página que estás buscando.</p>
      <Link href='/' className='text-blue-500 hover:underline'>Volver a la página principal
      </Link>
    </div>
  )
}

export default NotFound
import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      <h1 className='text-4xl ml-4'>Cargando...</h1>
    </div>
  )
}

export default Loading
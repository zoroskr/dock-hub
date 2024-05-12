import React from 'react'
import Avatar from './Avatar'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="bg-gray-900 border-gray-200 dark:bg-gray-900 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse -mt-3">
            <Image src='/logo_yatemate.png' width={140} height={100} className="rounded-md" alt="Flowbite Logo"  style={{ borderRadius: '50%'}}  />
            {/* Puedes ajustar marginTop según el tamaño de tu logo */}
          </a>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:text-white md:dark:text-blue-500 items-center max-h-16 overflow-hidden">
              <li>
                <a href="/" className="block py-2 px-3 text-lg text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 hover:scale-110" aria-current="page">Inicio</a>
              </li>
              <li>
                <a href="/login" className="block py-2 px-3 text-lg text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 hover:scale-110" aria-current="page">Iniciar Sesión</a>
              </li>
              <li>
                <a href="/register" className="block py-2 px-3 text-lg text-white md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500 duration-300 hover:scale-110" aria-current="page">Registrarse</a>
              </li>
              <li>
                <Avatar>Mi usuario</Avatar>
              </li>
            </ul>
          </div>
        </div>
    </div> 
  )
}

export default Navbar
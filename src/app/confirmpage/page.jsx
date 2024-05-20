"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Confirm() {
  const [token, setToken] = useState('');
  const router = useRouter();

  const handleTokenSubmit = () => {
    if (token) {
      axios.put('/api/confirm', { token })
        .then(() => {
          alert('Usuario verificado!');
          router.push('/login'); // Redirige al usuario a la página de inicio de sesión
        })
        .catch(() => alert('Token inválido.'));
    }
  }

  return (
    <div className='w-full flex flex-col min-h-screen items-center justify-center'>
      <input 
        type="text" 
        placeholder="Ingrese el token del usuario a validar" 
        className='rounded-xl mb-3 w-1/5'
        value={token} 
        onChange={(e) => setToken(e.target.value)} 
      />
      <button className='bg-gray-900 text-gray-300 rounded-xl p-2 font-semibold duration-500 hover:scale-105' onClick={handleTokenSubmit}>Aceptar</button>
    </div>
  );
}
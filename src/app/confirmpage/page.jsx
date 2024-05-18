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
    <div>
      <input 
        type="text" 
        placeholder="Ingrese el token del usuario a validar" 
        value={token} 
        onChange={(e) => setToken(e.target.value)} 
      />
      <button onClick={handleTokenSubmit}>Aceptar</button>
    </div>
  );
}
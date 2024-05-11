'use client';

import React, { useEffect, useState } from 'react'
import UserForm from '@/components/ui/UserForm'
import { useParams } from 'next/navigation';

const page = () => {
  const params = useParams();
  const [user, setUser] = useState({
    fullName: '',
    address: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    obtenerUsuario().then(data => {
      const response = data.find(user => user.password === params.id);
      setUser({
        fullName: response.fullName,
        address: response.address,
        email: response.email,
        password: response.password
      });
    });
  }, []);

  const obtenerUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users.json`);
      if (!response.ok) {
        throw new Error('No se pudo obtener el usuario');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <UserForm
      user={user}
    ></UserForm>
  )
}

export default page
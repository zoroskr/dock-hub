'use client';

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import UserForm from '@/components/ui/UserForm'
import NotFound from '@/app/not-found';
import { getUser } from '@/app/services/users.api.js';

const page = () => {
  const params = useParams();
  const decodedId = decodeURIComponent(params.id);
  const [render, setRender] = useState(decodedId == localStorage.getItem('id') ? true : false);
  const [user, setUser] = useState({
    fullName: '',
    address: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const inicializar = async () => {
      if (decodedId == localStorage.getItem('id')) {
        console.log("decodedId", decodedId);
        getUser(decodedId).then(data => {
          console.log("data", data);
          if (data) {
            setUser(data);
            setRender(true);
          } else {
            setRender(false);
          }
        });
      }
    }
    inicializar();
  }, []);

  return (
    <>
      {
        render ? (
          <UserForm
            user={user}
            title="Actualizar datos"
          >
          </UserForm>
        ) : (
          <NotFound></NotFound>
        )
      }
    </>
  )
}

export default page
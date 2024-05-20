'use client';

import React, { useEffect, useState } from 'react'
import { useParams} from 'next/navigation'
import UserFormEdit from '@/components/ui/UserFormEdit'
import NotFound from '@/app/not-found';
import { getUser } from '@/app/services/users.api.js';

const page = () => {
  const params = useParams();
  const [render, setRender] = useState(true);
  const [user, setUser] = useState({
    fullName: '',
    dni: '',
    address: '',
    email: '',
    password: '',
    isOwner: false,
  });

  useEffect(() => {
    const inicializar = async () => {
      if (params.id == localStorage.getItem('id')) {
        console.log("params.id", params.id);
        getUser(params.id).then(data => {
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
          <UserFormEdit
            user={user}
            title="Actualizar datos"
            userId={params.id}
          >
          </UserFormEdit>
        ) : (
          <NotFound></NotFound>
        )
      }
    </>
  )
}

export default page
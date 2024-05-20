import React from 'react';
import AdminForm from '@/components/ui/AdminForm';

const page = () => {

  const user = {
    fullName: '',
    dni: '',
    address: '',
    email: '',
    password: '',
    isOwner: false,
  };

  return (
    <AdminForm
      user={user}
      title="Registrar administrativo"
    ></AdminForm>
  );
};

export default page;
import React from 'react'
import UserForm from '@/components/ui/UserForm'

const page = () => {

  const user = {
    fullName: '',
    dni: '',
    address: '',
    email: '',
    password: '',
    isOwner: false,
  }

  return (
    <UserForm
      user={user}
      title="Registrarse"
    ></UserForm>
  )
}

export default page
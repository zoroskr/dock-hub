import React from 'react'
import UserForm from '@/components/ui/UserForm'

const page = () => {

  const user = {
    fullName: '',
    address: '',
    email: '',
    password: ''
  }

  return (
    <UserForm
      user={user}
    ></UserForm>
  )
}

export default page
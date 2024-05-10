import React from 'react'
import UserForm from '@/components/UserForm'

const page = () => {

  const user = {
    fullName: 'John Doe',
    address: '123 Main St',
    email: 'tuemail@example.com',
    password: ''
  }

  return (
    <UserForm
      user={user}
    ></UserForm>
  )
}

export default page
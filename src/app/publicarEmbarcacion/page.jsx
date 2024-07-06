import React from 'react'
import BoatsForm from '@/components/ui/BoatsForm'

const page = () => {
  const boat = {
    plate: '',
    name: '',
    type: '',
    description: '',
    image: '',
    adapted: '',
    owner: ''
  }
  return (
    <div className='grid place-items-center'>
      <BoatsForm
        title='Cargar una embarcación'
        boat={boat}
      ></BoatsForm>
    </div>
  )
}

export default page
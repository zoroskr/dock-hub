import React from 'react'
import PostsForm from '@/components/ui/PostsForm'

const page = () => {
  const post = {
    name: '',
    description: '',
    image: '',
    type: '',
    owner: ''
  }
  return (
    <div className='grid place-items-center'>
      <PostsForm
        title='Cargar un bien'
        post={post}
      ></PostsForm>
    </div>
  )
}

export default page
'use client'
import React, { useEffect, useState } from 'react'
import PostsForm from '@/components/ui/PostsForm'
import { getPost } from '@/app/services/posts.api'
import { useParams } from 'next/navigation'

const page = () => {
  const params = useParams();
  const [post, setPost] = useState();
  
  useEffect(() => {
    const id = params.id;
    const inicializar = async () => {
      getPost(id).then(data => {
        if (data) {
          setPost(data);
        }
      });
    }
    inicializar();
  }
  , []);

  return (
    <PostsForm
      post={post}
      title="Actualizar datos"
    ></PostsForm>
  )
}

export default page
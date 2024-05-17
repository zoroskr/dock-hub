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
    getPost(id).then(data => {
      setPost(data);
      console.log("posten useeffect", post);
      console.log(data);
    });
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
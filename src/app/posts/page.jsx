"use client";
import React, { useEffect, useState } from "react";
import Post from "@/components/ui/Post";
import Title from "@/components/ui/Title";
import { getUser } from "@/app/services//users.api";
import EmptyList from "@/components/ui/EmptyList";

const page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myFavorites, setMyFavorites] = useState([]);

  useEffect(() => {
    const obtenerPosts = async () => {
      try {
        const user = await getUser(localStorage.getItem("id"));
        setPosts(user.posts);
        setMyFavorites(user.favorites);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    obtenerPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-4 min-h-screen w-full">
        <Title text="Mis Publicaciones" />
        <div className="flex flex-wrap justify-center gap-4">
          {loading ? (
            <span className="text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium">
              Cargando Publicaciones...
            </span>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div className="p-2" key={post._id}>
                <Post
                  post={post}
                  showProposeButton={false}
                  isFavorite={myFavorites.includes(post._id) ? true : false}
                />
              </div>
            ))
          ) : (
            <EmptyList message="No tienes publicaciones" />
          )}
        </div>
      </div>
    </>
  );
};

export default page;

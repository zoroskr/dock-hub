"use client";

import React, { useEffect, useRef, useState } from "react";
import Post from "@/components/ui/Post";
import { getPosts } from "@/app/services/posts.api";
import { getUser, updateUser } from "../services/users.api";
import Swal from "sweetalert2";
import EmptyList from "@/components/ui/EmptyList";
import Loading from "../loading";
import Title from "@/components/ui/Title";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Aún no tienes publicaciones favoritas");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let fetchedPosts = await getPosts();
        const user = await getUser(localStorage.getItem("id"));
        fetchedPosts = fetchedPosts.filter((p) => user.favorites.includes(p._id));
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setMessage("Error al obtener publicaciones");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const onRemoveFavorite = async (postId) => {
    const loggedUserId = localStorage.getItem("id");
    try {
      if (!loggedUserId) {
        router.push("/login");
        return;
      }
      const user = await getUser(loggedUserId);
      user.favorites = user.favorites.filter((id) => id !== postId);
      setPosts(posts.filter((p) => p._id !== postId));
      await updateUser(loggedUserId, user);
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1500,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Se eliminó de Mis favoritos.",
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <>
      <Title text="Mis favoritos" />
      {loading ? (
        <Loading />
      ) : (
        <>
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,384px))] gap-4 p-4 justify-center">
              {posts.map((post) => (
                <div className="p-2" key={post._id}>
                  <Post
                    post={post}
                    ownerButtons={false}
                    showProposeButton={true}
                    isFavorite={true}
                    onRemoveFavorite={onRemoveFavorite}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyList message={message} />
          )}
        </>
      )}
    </>
  );
}

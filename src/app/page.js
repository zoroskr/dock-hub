"use client";

import React, { useEffect, useRef, useState } from "react";
import Post from "@/components/ui/Post";
import { getPosts } from "./services/posts.api";
import { getUser } from "./services/users.api";
import Loading from "./loading";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("No hay publicaciones disponibles");
  const [favoritesPosts, setFavoritesPosts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    Embarcaciones: false,
    Vehiculos: false,
    Aeronaves: false,
    Inmuebles: false,
  });

  const form = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      let user;
      try {
        let fetchedPosts = await getPosts();
        //filtrar por los que no corresponden al usuario logueado
        fetchedPosts = fetchedPosts.filter((p) => p.owner !== localStorage.getItem("id"));
        //Ver si se muestran posts de todos los tipos o solo de embarcaciones
        if (
          !localStorage.getItem("id") ||
          (localStorage.getItem("verified") == "false" && localStorage.getItem("type") != "Admin")
        ) {
          fetchedPosts = fetchedPosts.filter((p) => p.type == "Embarcaciones");
        }
        //Mostrar solo posts en estado Activo
        fetchedPosts = fetchedPosts.filter((p) => p.state == "Activo");

        if (localStorage.getItem("id")) {
          user = await getUser(localStorage.getItem("id"));
          setFavoritesPosts(user.favorites);
        }
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        setMessage("Error al obtener publicaciones");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const posts = await getPosts(); // Traigo todos los posts de nuevo para buscar desde ahi

    let defaultSearch = "";

    if (form.current) {
      defaultSearch = form.current.elements["default-search"].value;
    }

    const lowerCaseSearch = defaultSearch.toLowerCase();

    // Si no hay término de búsqueda, obtener todos los posts
    if (!defaultSearch) {
      try {
        setPosts(posts);
        setMessage(posts.length === 0 ? "No hay publicaciones disponibles" : "");
      } catch (error) {
        console.error("Error fetching posts:", error);
        setMessage("Error al obtener publicaciones");
      }
      return;
    }

    // Filtrar los posts existentes
    if (posts.length > 0) {
      const postsFiltered = posts.filter(
        (p) =>
          (p.name.toLowerCase().includes(lowerCaseSearch) || p.description.toLowerCase().includes(lowerCaseSearch)) &&
          p.owner !== localStorage.getItem("id"),
      );

      if (postsFiltered.length === 0) {
        setMessage("No se encuentran resultados relacionados");
      } else {
        setMessage(""); // Limpiar el mensaje si se encuentran resultados
      }

      setPosts(postsFiltered);
    } else {
      console.warn("No posts available to filter");
      setMessage("No hay publicaciones disponibles");
    }
  };

  const aplicarFiltros = async () => {
    const selectOrdenador = document.getElementById("ordenador");
    const valor = selectOrdenador.value;
    let posts = await getPosts();
    posts = posts.filter((p) => p.owner !== localStorage.getItem("id"));

    if (
      !localStorage.getItem("id") ||
      (localStorage.getItem("verified") === "false" && localStorage.getItem("type") !== "Admin")
    ) {
      posts = posts.filter((p) => p.type === "Embarcaciones");
    }

    posts = posts.filter((p) => p.state === "Activo");

    const activeFilters = Object.keys(selectedOptions).filter((option) => selectedOptions[option]);
    let filteredPosts = posts.filter((post) => {
      return activeFilters.every((filter) => {
        if (filter === "adaptados") {
          return post.adapted === true;
        } else {
          return post.type.toLowerCase() === filter.toLowerCase();
        }
      });
    });
    if (valor == "viejos"){
      filteredPosts = filteredPosts.reverse();
    }

    setPosts(filteredPosts);
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
            <form className="w-1/2 mt-auto mb-auto ml-auto p-3" onSubmit={handleSubmit} ref={form}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative rounded-xl bg-custom-gray">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-words overflow-y-auto"
                  placeholder="Buscar Embarcaciones, Vehiculos..."
                />
                <button
                  type="button"
                  className="text-white absolute right-2.5 bottom-2.5 rounded-xl bg-gray-800 duration-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Buscar
                </button>
              </div>
            </form>
            <div className="flex w-1/2 mr-auto p-3 items-center justify-evenly text-sm">
              <div className="flex items-center justify-between">
                <div className="mr-1 text-xs">Ordenar Por</div>
                <select name="ordenador" id="ordenador" className="rounded-xl text-xs justify-evenly">
                  <option value="nuevos">Más nuevas</option>
                  <option value="viejos">Más antiguas</option>
                </select>
              </div>
              {localStorage.getItem("type") === "Titular" && localStorage.getItem("verified") === "true" && (
                <div id="checkboxList" className="text-sm font-medium">
                  <div>
                    <input
                      type="checkbox"
                      id="Embarcaciones"
                      className="m-1 rounded-xl focus:outline-none"
                      style={{ outline: "none", boxShadow: "none" }}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="Embarcaciones">Embarcaciones</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Vehículos"
                      className="m-1 rounded-xl focus:outline-none"
                      style={{ outline: "none", boxShadow: "none" }}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="Vehículos">Vehiculos</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Aeronaves"
                      className="m-1 rounded-xl focus:outline-none"
                      style={{ outline: "none", boxShadow: "none" }}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="Aeronaves">Aeronaves</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Inmuebles"
                      className="m-1 rounded-xl focus:outline-none"
                      style={{ outline: "none", boxShadow: "none" }}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="Inmuebles">Inmuebles</label>
                  </div>
                </div>
              )}
              <div>
                <input
                  type="checkbox"
                  id="adaptados"
                  className="rounded-xl focus:outline-none"
                  style={{ outline: "none", boxShadow: "none" }}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="adaptados" className="m-1 text-sm font-medium">
                  Aptos para discapacitados
                </label>
              </div>
              <button
                className="text-white rounded-xl bg-gray-800 duration-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={aplicarFiltros}
              >
                Aplicar
              </button>
            </div>
          </div>
          <div className="max-w-screen-xl flex flex-wrap justify-between">
            <div className="w-1/5 p-2 sticky top-0 h-screen flex items-center">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <video
                  src="/yateMate.mp4"
                  autoPlay
                  muted
                  loop
                  className="object-cover rounded-xl"
                  width="320"
                  height="180"
                />
              </div>
            </div>
            <div className="w-4/5 p-2 grid grid-cols-3 gap-4">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <div className="" key={post._id}>
                    {
                      <Post
                        post={post}
                        showProposeButton={true}
                        isFavorite={favoritesPosts.includes(post._id) ? true : false}
                      />
                    }
                  </div>
                ))
              ) : (
                <span className="text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium">
                  {message}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

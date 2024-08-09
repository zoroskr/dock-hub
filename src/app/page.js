"use client";

import React, { useEffect, useRef, useState } from "react";
import Post from "@/components/ui/Post";
import { getPosts } from "./services/posts.api";
import { getUser } from "./services/users.api";
import Loading from "./loading";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
import SearchInput from "@/components/ui/SearchInput";
import FilterButton from "@/components/ui/FilterButton";

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
    const adaptadosCheckbox = document.getElementById("adaptados");
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
    if (activeFilters.length > 0) {
      posts = posts.filter((p) => activeFilters.includes(p.type));
    }
    if (adaptadosCheckbox.checked) {
      posts = posts.filter((p) => p.adapted);
    }
    if (valor == "nuevos") {
      posts = posts.reverse();
    }

    setPosts(posts);
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
          <section className="flex flex-col md:flex-row">
            <SearchInput className="bg-blue-500" handleSubmit={handleSubmit} form={form} />

            <div className="flex md:w-1/2 md:mr-auto p-3 items-center justify-evenly text-sm">
              <div className="lg:flex items-center justify-between">
                <div className="mr-1 text-xs">Ordenar Por</div>
                <select name="ordenador" id="ordenador" className="rounded-xl text-xs justify-evenly">
                  <option value="viejos">Más antiguas</option>
                  <option value="nuevos">Más nuevas</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {((localStorage.getItem("type") === "Titular" && localStorage.getItem("verified") === "true") ||
                  localStorage.getItem("type") === "Admin") && (
                  <div id="checkboxList" className="text-xs lg:text-sm font-medium">
                    <CustomCheckbox type="Embarcaciones" handleCheckboxChange={handleCheckboxChange} />
                    <CustomCheckbox type="Vehículos" handleCheckboxChange={handleCheckboxChange} />
                    <CustomCheckbox type="Aeronaves" handleCheckboxChange={handleCheckboxChange} />
                    <CustomCheckbox type="Inmuebles" handleCheckboxChange={handleCheckboxChange} />
                  </div>
                )}

                <div className="text-xs lg:text-sm">
                  <CustomCheckbox
                    type="adaptados"
                    label="Aptos para discapacitados"
                    handleCheckboxChange={handleCheckboxChange}
                  />
                  <FilterButton text="Aplicar" handleClick={aplicarFiltros} />
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap justify-between">
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
            <div className="w-4/5 p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center">
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

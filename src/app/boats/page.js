"use client";

import React, { useEffect, useState } from "react";

import { getUser } from "@/app/services/users.api";
import Title from "@/components/ui/Title";
import BoatCard from "@/components/ui/BoatCard";
import EmptyList from "@/components/ui/EmptyList";
import Loading from "../loading";

const page = () => {
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoats = async () => {
      const user = await getUser(localStorage.getItem("id"));
      setBoats(user.boats);
      setLoading(false);
    };

    fetchBoats();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
      <Title text="Mis embarcaciones" />
          {boats.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-4 p-4 place-items-center">
              {boats.map((boat, index) => (
                <BoatCard key={index} boat={boat} />
              ))}
            </div>
          ) : (
            <EmptyList message="No tienes embarcaciones cargadas" />
          )}
        </>
      )}
    </>
  );
};

export default page;

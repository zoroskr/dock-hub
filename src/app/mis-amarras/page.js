"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/ui/Title";
import Loading from "@/app/loading";
import { getUser } from "../services/users.api";
import CardAmarra from "@/components/ui/CardAmarra";
import EmptyList from "@/components/ui/EmptyList";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [amarras, setAmarras] = useState([]);

  useEffect(() => {
    const fetchAmarras = async () => {
      const user = await getUser(localStorage.getItem("id"));
      const data = user.amarras;
      setAmarras(data);
      setLoading(false);
    };
    fetchAmarras();
  }, []);

  return (
    <>
      <Title text="Mis amarras" />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {amarras && amarras.length > 0 ? (
            amarras.map((amarra) => <CardAmarra key={amarra._id} amarra={amarra} />)
          ) : (
            <EmptyList message="No tienes amarras" />
          )}
        </div>
      )}
    </>
  );
};

export default page;

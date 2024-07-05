"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/ui/Title";
import Loading from "@/app/loading";
import { getUser, updateUser } from "../services/users.api";
import CardAmarra from "@/components/ui/CardAmarra";
import { getAmarra, updateAmarra } from "../services/amarras.api";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [amarras, setAmarras] = useState([]);

  useEffect(() => {
    const fetchAmarras = async () => {
      const user = await getUser(localStorage.getItem("id"));
      // user.amarras.push("667c8cdb0e37fa11dae9f2ed");
      // user.amarras[0].marina = '';
      // await updateUser(user._id, user);

      // const userActualizado = await getUser(localStorage.getItem("id"));
      // const data = userActualizado.amarras;
      
      
      // const amarraactualizada = await getAmarra("667c8cdb0e37fa11dae9f2ed");
      // amarraactualizada.marina = "6686e0167457150a0f56a421";
      // await updateAmarra("667c8cdb0e37fa11dae9f2ed", amarraactualizada);
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
            <span className="text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium">
              No hay amarras
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default page;

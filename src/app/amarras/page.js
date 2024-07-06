"use client";

import BerthCard from "@/components/ui/BerthCard";
import EmptyList from "@/components/ui/EmptyList";
import Title from "@/components/ui/Title";
import React, { useEffect, useState } from "react";
import { getAmarras } from "@/app/services/amarras.api";
import Loading from "../loading";

const page = () => {
  const [amarras, setAmarras] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmarras = async () => {
      const data = await getAmarras();
      const amarrasDisponibles = data.filter((amarra) => amarra.availabilityDates.length > 0);
      setAmarras(amarrasDisponibles);
      setLoading(false);
    };
    fetchAmarras();
  }, []);

  return (
    <>
      <Title text="Amarras disponibles" />
      {!loading ? (
        <div className="w-full place-items-center mb-3">
          {amarras && amarras.length > 0 ? (
            <div className="w-4/5 grid grid-cols-3 gap-3 mt-5 mx-auto">
              {amarras.map((amarra) => (
                <BerthCard key={amarra._id} amarra={amarra} mueveOno={true} />
              ))}
            </div>
          ) : (
            <EmptyList message="No hay amarras disponibles para alquilar" />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default page;

"use client";

import BerthCard from "@/components/ui/BerthCard";
import Title from "@/components/ui/Title";
import React, { useEffect, useState } from "react";

const page = () => {
  const [amarras, setAmarras] = useState();

  useEffect(() => {
    const fetchAmarras = async () => {
      const response = await fetch("http://localhost:3000/api/amarras");
      const data = await response.json();
      setAmarras(data);
    };
    fetchAmarras();
  }, []);

  return (
    <div className="w-full place-items-center mb-3">
      <Title text="Amarras disponibles" />
      <div className="w-4/5 grid grid-cols-3 gap-3 mt-5 mx-auto">
        {amarras &&
          amarras.map((amarra) => (
            <BerthCard key={amarra._id} amarra={amarra} mueveOno={true}/>
          ))}
      </div>
    </div>
  );
};

export default page;

"use client";

import MarinaCard from "@/components/ui/MarinaCard";
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
    <div>
      <Title text="Amarras disponibles" />
      <div className="grid grid-cols-3 gap-2 place-items-center">
        {amarras &&
          amarras.map((amarra) => (
            <MarinaCard key={amarra._id} amarra={amarra} />
          ))}
      </div>
    </div>
  );
};

export default page;

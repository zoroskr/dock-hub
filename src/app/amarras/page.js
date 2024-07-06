"use client";

import React, { useEffect, useState } from "react";
import BerthCard from "@/components/ui/BerthCard";
import EmptyList from "@/components/ui/EmptyList";
import Title from "@/components/ui/Title";
import Loading from "../loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAmarras } from "@/app/services/amarras.api";

const page = () => {
  const [amarras, setAmarras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allAmarras, setAllAmarras] = useState([]);

  useEffect(() => {
    const fetchAmarras = async () => {
      const data = await getAmarras();
      const amarrasDisponibles = data.filter((amarra) => amarra.availabilityDates.length > 0);
      setAmarras(amarrasDisponibles);
      setAllAmarras(amarrasDisponibles);
      setLoading(false);
    };
    fetchAmarras();
  }, []);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const aplicarFiltros = () => {
    const amarrasFiltradas = allAmarras.filter((amarra) => 
      amarra.availabilityDates.some(dateLapse => 
        new Date(dateLapse.startDate) < startDate && new Date(dateLapse.endDate) > endDate
      )
    );
    setAmarras(amarrasFiltradas);
  };

  const restablecerFiltros = () => {
    setAmarras(allAmarras);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <>
      <Title text="Amarras disponibles" />
      <div className="w-full place-items-center mb-3">
        <div className="w-4/5 mx-auto my-5">
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
        <div className="flex space-x-4 justify-center mb-4">
          <button
            className="text-white rounded-xl bg-gray-800 duration-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={aplicarFiltros}
          >
            Aplicar
          </button>
          <button
            className="text-white rounded-xl bg-gray-800 duration-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={restablecerFiltros}
          >
            Restablecer
          </button>
        </div>
        {!loading ? (
          amarras && amarras.length > 0 ? (
            <div className="w-4/5 grid grid-cols-3 gap-3 mt-5 mx-auto">
              {amarras.map((amarra) => (
                <BerthCard key={amarra._id} amarra={amarra} mueveOno={true} />
              ))}
            </div>
          ) : (
            <EmptyList message="No hay amarras disponibles para alquilar" />
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default page;

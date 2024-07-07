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
  const [selectedMarina, setSelectedMarina] = useState("todos")

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
    let amarrasFiltradas = allAmarras;
    if (startDate && endDate){
      amarrasFiltradas = allAmarras.filter((amarra) => 
        amarra.availabilityDates.some(dateLapse => 
          new Date(dateLapse.startDate) < startDate && new Date(dateLapse.endDate) > endDate
        )
      );
    }
    const puerto = document.getElementById("puerto").value
    if (puerto != "todos") {
      amarrasFiltradas = amarrasFiltradas.filter((a) => a.marina.name == puerto);
    }
    setAmarras(amarrasFiltradas);
  };

  const restablecerFiltros = () => {
    setAmarras(allAmarras);
    setStartDate(null);
    setEndDate(null);
    setSelectedMarina("todos");
  };

  const handleSelectChange = (e) => {
    setSelectedMarina(e.target.value);
  }

  return (
    <>
      <Title text="Amarras disponibles" />
      <div className="flex justify-center space-x-3">
        <div className="w-1/5 p-1 gap-3 mt-3">
          <div className="flex text-md text-black font-semibold mb-2 justify-center mx-auto">Filtrar por fecha de disponibilidad</div>
          <div className="flex items-center justify-center mx-auto">
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>
          <div className="flex items-center justify-between">
              <div className="mr-1 text-xs">Ubicadas en el puerto</div>
              <select name="puerto" id="puerto" className="rounded-xl text-xs justify-evenly" value={selectedMarina} onChange={handleSelectChange}>
                <option value="todos">Cualquiera</option>
                <option value="Marina Norte">Marina Norte</option>
                <option value="Marina Centro">Marina Centro</option>
                <option value="Marina Sur">Marina Sur</option>
                <option value="Marina Este">Marina Este</option>
                <option value="Marina Oeste">Marina Oeste</option>
                <option value="Marina Delta">Marina Delta</option>
                <option value="Marina Bahía">Marina Bahía</option>
                <option value="Marina Atlántico">Marina Atlántico</option>
              </select>
            </div>
          <div className="flex mt-2 gap-2 justify-center mx-auto">
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
        </div>
        <div className="w-4/5 p-1 mb-2">
          {!loading ? (
            amarras && amarras.length > 0 ? (
              <div className="grid grid-cols-3 gap-3 mt-5">
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
      </div>

    </>
  );
};

export default page;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { updateAmarra } from "@/app/services/amarras.api";
import Swal from "sweetalert2";
import ActionButton from "./ActionButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, setSeconds, setMilliseconds } from "date-fns";
import { set } from "mongoose";

const CardAmarra = ({ amarra, mueveOno, onAmarraUpdated }) => {
  const [absence, setAbsence] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const router = useRouter();

  const handleClick = () => {
    setAbsence(true);
    setStartDate(null);
    setEndDate(null);
  };

  const handleAbsence = async () => {
    const availabilityDates = [...amarra.availabilityDates, { startDate, endDate }];
    await updateAmarra(amarra._id, { availabilityDates });
    setAbsence(false);
    Swal.fire({
      icon: "success",
      title: "¡Listo!",
      text: "Se ha notificado la ausencia",
      // showConfirmButton: false,
    });
    onAmarraUpdated();
  };

  // Normaliza la fecha para que sea a las 00:00:00.000
  const normalizeDate = (date) => {
    return setMilliseconds(setSeconds(setMinutes(setHours(new Date(date), 0), 0), 0), 0);
  };

  return (
    <div
      className={`max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 duration-500 ${mueveOno ? "hover:scale-105" : ""}`}
    >
      <div className="p-5 flex flex-col justify-between">
        <p>Puerto: {amarra.marina.name}</p>
        <p>Ubicación: {amarra.marina.address}</p>
        <p>Número de amarra: {amarra._id}</p>
        <>{!absence && <ActionButton handleSubmit={handleClick} text="Notificar ausencia" />}</>

        {absence && (
          <>
            <p>Período de ausencia:</p>
            <label htmlFor="startDate">Desde:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDateIntervals={amarra.availabilityDates.reduce((acc, curr) => {
                acc.push({ start: normalizeDate(curr.startDate), end: normalizeDate(curr.endDate) });
                return acc;
              }, [])}
            />
            <label htmlFor="endDate">Hasta:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              // maxDate={amarra.dateLapse.endDate}
              // este reduce retorna un array de objetos con los periodos de ausencias
              excludeDateIntervals={amarra.availabilityDates.reduce((acc, curr) => {
                acc.push({ start: normalizeDate(curr.startDate), end: normalizeDate(curr.endDate) });
                return acc;
              }, [])}
            />
            <ActionButton handleSubmit={handleAbsence} text="Notificar" />
          </>
        )}

        <section>
          <header>Mi embarcación:</header>
          <div>
            <img src={amarra.boat.image} alt={amarra.location} className="rounded-xl" />
            <p>Plate: {amarra.boat.plate}</p>
          </div>
          <ActionButton
            text="Publicar para intercambiar"
            handleSubmit={() => router.push(`/boats/${amarra.boat._id}`)}
          />
        </section>
      </div>
    </div>
  );
};

export default CardAmarra;

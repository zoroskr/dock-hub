"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { updateAmarra } from "@/app/services/amarras.api";
import Swal from "sweetalert2";
import ActionButton from "./ActionButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes, setSeconds, setMilliseconds } from "date-fns";

const CardAmarra = ({ amarra, mueveOno, onAmarraUpdated }) => {
  const [absence, setAbsence] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const includesDate = (anotherDateLapse) => {
    const selectStartDate = normalizeDate(startDate).getTime();
    const selectEndDate = normalizeDate(endDate).getTime();
    const anotherStartDate = normalizeDate(anotherDateLapse.startDate).getTime();
    const anotherEndDate = normalizeDate(anotherDateLapse.endDate).getTime();
    return anotherStartDate >= selectStartDate && anotherEndDate <= selectEndDate;
  };

  const handleClick = () => {
    setAbsence(true);
  };

  const handleAbsence = async () => {
    try {
      if (startDate.getTime() == endDate.getTime()) {
        throw new Error("La fecha de inicio y fin no pueden ser iguales");
      }

      if (amarra.availabilityDates.some((dateLapse) => includesDate(dateLapse))) {
        throw new Error("No puedes seleccionar un periodo que incluya periodos excluidos");
      }

      const availabilityDates = [...amarra.availabilityDates, { startDate, endDate }];
      await updateAmarra(amarra._id, { availabilityDates });
      setAbsence(false);
      onAmarraUpdated();
      setDateRange([null, null]);

      Swal.fire({
        icon: "success",
        title: "¡Listo!",
        text: "Se ha notificado la ausencia",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
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
        <h1 className="text-xl font-bold">{amarra.location}</h1>
        <p>Amarra: {amarra.mooringNumber}</p>
        <p>Puerto: {amarra.marina.name}</p>
        <p>Ubicación: {amarra.marina.address}</p>
        <>{!absence && <ActionButton handleSubmit={handleClick} text="Notificar ausencia" />}</>

        {absence && (
          <>
            <p>Período de ausencia:</p>

            <DatePicker
              selectsRange={true}
              startDate={startDate}
              minDate={new Date()}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              excludeDateIntervals={amarra.availabilityDates.reduce((acc, curr) => {
                acc.push({ start: normalizeDate(curr.startDate), end: normalizeDate(curr.endDate) });
                return acc;
              }, [])}
              withPortal
            />
            <ActionButton
              handleSubmit={handleAbsence}
              text="Notificar"
              isDisabled={startDate && endDate ? false : true}
            />
          </>
        )}

        <section>
          <header>Mi embarcación:</header>
          <div>
            <img src={amarra.boat.image} alt={amarra.location} className="rounded-xl" />
            <p>Plate: {amarra.boat.plate}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CardAmarra;

"use client";

import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ActionButton from "./ActionButton";
import Image from "next/image";
import { updateAmarra } from "@/app/services/amarras.api";
import Swal from "sweetalert2";

const Card = ({ reservation }) => {
  const [absence, setAbsence] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const minDate = reservation.dateLapse.startDate > new Date() ? reservation.dateLapse.startDate : new Date();

  const handleClick = () => {
    const fechaFin = new Date(reservation.dateLapse.endDate);
    if (fechaFin < new Date()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puedes notificar ausencia en una fecha pasada",
      });
      return;
    }
    setAbsence(true);
  };

  const handleAbsence = async () => {
    const newFields = { isAvailable: false, availability: { startDate, endDate } };
    await updateAmarra(reservation.amarra._id, newFields);
    setAbsence(false);
    Swal.fire({
      icon: "success",
      title: "¡Listo!",
      text: "Se ha notificado la ausencia",
    });
  };

  const convertToDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const calculateDays = (dateLapse) => {
    const start = new Date(dateLapse.startDate);
    const end = new Date(dateLapse.endDate);
    const days = Math.abs(end - start) / 1000 / 60 / 60 / 24;
    return days;
  };

  useEffect(() => {
    const initializateDates = () => {
      const start = new Date(reservation.dateLapse.startDate);
      if (start > new Date()) {
        setStartDate(start);
        setEndDate(start);
      } else {
        setStartDate(new Date());
        setEndDate(new Date());
      }
    };
    initializateDates();
  }, [reservation.dateLapse.startDate]);

  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
      <div className="p-5 grid place-items-center">
        <h3 className="text-xl font-bold text-center text-custom-gray dark:text-gray-100">{reservation.amarra.location}</h3>
        <p>
          Período: Del {convertToDate(reservation.dateLapse.startDate)} al {convertToDate(reservation.dateLapse.endDate)}
        </p>
        <p>${reservation.amarra.dailyRate} USD por día</p>
        <p>
          ${reservation.amarra.dailyRate * calculateDays(reservation.dateLapse)} USD por {calculateDays(reservation.dateLapse)} días
        </p>
        <p>Inquilino: {reservation.owner.fullName}</p>
        <Image src={reservation.amarra.image} width={300} height={300} className="rounded-xl" alt={reservation.amarra.location} />
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
              minDate={minDate}
              maxDate={new Date(reservation.dateLapse.endDate)}
            />
            <label htmlFor="endDate">Hasta:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={minDate}
              maxDate={new Date(reservation.dateLapse.endDate)}
            />
            <ActionButton handleSubmit={handleAbsence} text="Notificar" />
          </>
        )}
        <>{localStorage.getItem("type") !== "Admin" && !absence && <ActionButton handleSubmit={handleClick} text="Notificar ausencia" />}</>
      </div>
    </div>
  );
};

export default Card;

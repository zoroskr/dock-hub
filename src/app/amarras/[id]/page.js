"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getAmarra, updateAmarra } from "@/app/services/amarras.api";
import MarinaCard from "@/components/ui/MarinaCard";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "@/app/loading";
import Title from "@/components/ui/Title";
import ActionButton from "@/components/ui/ActionButton";
import Swal from "sweetalert2";
import { createReservation } from "@/app/services/reservations.api";
import { getUser } from "@/app/services/users.api";
import { set } from "mongoose";

const page = () => {
  const [amarra, setAmarra] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const onChange = (dates) => {
    console.log("🚀 ~ onChange ~ dates:", dates);
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const fetchAmarra = async () => {
      const data = await getAmarra(params.id);
      setAmarra(data);
      setStartDate(new Date(data.availability.startDate));
      setEndDate(new Date(data.availability.endDate));
      setLoading(false);
    };
    fetchAmarra();
  }, [loading]);

  const handleSubmit = async () => {
    try {
      console.log("🚀 ~ handleSubmit ~ startDate", startDate);
      const user = await getUser(localStorage.getItem("id"));
      console.log("🚀 ~ handleSubmit ~ user:", user);
      const reservaActual = user.reservations.find((r) => new Date(r.dateLapse.endDate) >= new Date());

      if (reservaActual && overlaps(reservaActual.dateLapse, amarra.availability)) {
        console.log("🚀 ~ handleSubmit ~ amarra.availability:", amarra.availability);
        console.log("🚀 ~ handleSubmit ~ reservaActual:", reservaActual);

        throw new Error("Tienes una reserva que se superpone con esta fecha");
      }

      const newReservation = {
        location: amarra.location,
        dateLapse: {
          startDate: new Date(amarra.availability.startDate),
          endDate: new Date(amarra.availability.endDate),
        },
        cost: amarra.dailyRate, // Cambiar a costo total
        image: "https://i.imgur.com/A4j1U5Y.jpeg",
        owner: localStorage.getItem("id"),
      };
      const data = await createReservation(newReservation);
      await updateAmarra(amarra._id, { isAvailable: false });
      if (!data) {
        throw new Error("Error al crear la reserva");
      }
      Swal.fire({
        title: "Reserva exitosa",
        text: "Tu reserva ha sido registrada",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const overlaps = (dateLapse, anotherDateLapse) => {
    // const start = new Date(dateLapse.startDate);
    // const end = new Date(dateLapse.endDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const anotherStart = new Date(anotherDateLapse.startDate);
    const anotherEnd = new Date(anotherDateLapse.endDate);

    return !((anotherStart < start && anotherEnd < start) || (anotherStart > end && anotherEnd > end));
  };

  return (
    <>
      <Title text="Amarra" />
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <span>Seleccione el periodo</span>
          <div className="grid grid-cols-2 place-items-center">
            <MarinaCard title="Reservar alquiler" amarra={amarra} startDate={startDate} endDate={endDate} />
            <div className="grid">
              <DatePicker
                renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
                  <div>
                    <button
                      aria-label="Previous Month"
                      className={"react-datepicker__navigation react-datepicker__navigation--previous"}
                      style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                      onClick={decreaseMonth}
                    >
                      <span className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"}>{"<"}</span>
                    </button>
                    <span className="react-datepicker__current-month">
                      {monthDate.toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      aria-label="Next Month"
                      className={"react-datepicker__navigation react-datepicker__navigation--next"}
                      style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
                      onClick={increaseMonth}
                    >
                      <span className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--next"}>{">"}</span>
                    </button>
                  </div>
                )}
                selected={startDate}
                onChange={onChange}
                minDate={new Date(amarra.availability.startDate)}
                maxDate={new Date(amarra.availability.endDate)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                showDisabledMonthNavigation
                monthsShown={2}
              />
              <ActionButton text="Reservar alquiler" handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;

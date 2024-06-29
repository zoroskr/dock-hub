"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

const page = () => {
  const [amarra, setAmarra] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    const fetchAmarra = async () => {
      const data = await getAmarra(params.id);
      setAmarra(data);
      setStartDate(new Date(data.availability.startDate));
      setEndDate(addDays(new Date(data.availability.startDate), 5));
      setLoading(false);
    };
    fetchAmarra();
  }, [loading]);

  const overlaps = (anotherDateLapse) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const anotherStart = new Date(anotherDateLapse.startDate);
    const anotherEnd = new Date(anotherDateLapse.endDate);

    return !((anotherStart < start && anotherEnd < start) || (anotherStart > end && anotherEnd > end));
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handleSubmit = async () => {
    try {
      const user = await getUser(localStorage.getItem("id"));
      const reservasActivas = user.reservations.filter((r) => new Date(r.dateLapse.endDate) >= new Date());
      const isOverlaps = reservasActivas.some((r) => overlaps(r.dateLapse));
      console.log("🚀 ~ handleSubmit ~ isOverlaps:", isOverlaps);

      if (isOverlaps) {
        throw new Error("Tienes una reserva que se superpone con el periodo seleccionado");
      }

      const newReservation = {
        owner: localStorage.getItem("id"),
        amarra: amarra._id,
        dateLapse: {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      };
      await createReservation(newReservation);
      
      updateAmarra(amarra._id, { availability: {startDate: newReservation.dateLapse.endDate} });
      Swal.fire({
        title: "Reserva exitosa",
        text: "Tu reserva ha sido registrada",
        icon: "success",
        confirmButtonText: "Ok",
      });
      router.push(`/reservations`);
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

  return (
    <>
      <Title text="Amarra" />
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <span>Seleccione el periodo</span>
          <div className="grid grid-cols-2 place-items-center">
            <MarinaCard title="Reservar alquiler" amarra={amarra} />
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
              <ActionButton text="Reservar alquiler" handleSubmit={handleSubmit} isDisabled={endDate ? false : true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;

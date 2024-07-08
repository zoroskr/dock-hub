"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getAmarra, updateAmarra } from "@/app/services/amarras.api";
import BerthCard from "@/components/ui/BerthCard";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "@/app/loading";
import Title from "@/components/ui/Title";
import ActionButton from "@/components/ui/ActionButton";
import Swal from "sweetalert2";
import { createReservation } from "@/app/services/reservations.api";
import { getUser } from "@/app/services/users.api";
import { setHours, setMinutes, setSeconds, setMilliseconds } from "date-fns";

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
      setLoading(false);
    };
    fetchAmarra();
  }, [loading]);

  const includesDate = (anotherDateLapse) => {
    const selectStartDate = normalizeDate(startDate).getTime();
    const selectEndDate = normalizeDate(endDate).getTime();
    const anotherStartDate = normalizeDate(anotherDateLapse.startDate).getTime();
    const anotherEndDate = normalizeDate(anotherDateLapse.endDate).getTime();
    return anotherStartDate >= selectStartDate && anotherEndDate <= selectEndDate;
  };

  const overlaps = (anotherDateLapse) => {
    const selectStartDate = normalizeDate(startDate).getTime();
    const selectEndDate = normalizeDate(endDate).getTime();
    const anotherStartDate = normalizeDate(anotherDateLapse.startDate).getTime();
    const anotherEndDate = normalizeDate(anotherDateLapse.endDate).getTime();
    return !(
      (anotherStartDate < selectStartDate && anotherEndDate < selectStartDate) ||
      (anotherStartDate > selectEndDate && anotherEndDate > selectEndDate)
    );
  };

  // Normaliza la fecha para que sea a las 00:00:00.000
  const normalizeDate = (date) => {
    return setMilliseconds(setSeconds(setMinutes(setHours(new Date(date), 0), 0), 0), 0);
  };

  const handleSubmit = async () => {
    try {
      if (startDate.getTime() == endDate.getTime()) {
        throw new Error("La fecha de inicio y fin no pueden ser iguales");
      }

      const user = await getUser(localStorage.getItem("id"));
      const reservasActivas = user.reservations.filter(
        (r) => new Date(r.dateLapse.endDate).getTime() >= new Date().getTime(),
      );

      if (amarra.reservations.some((r) => includesDate(r.dateLapse))) {
        throw new Error("No puedes seleccionar un periodo que incluya periodos excluidos");
      }

      const isOverlaps = reservasActivas.some((r) => overlaps(r.dateLapse));

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
      <Title text="Alquiler de Amarra" />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-3/4 grid grid-cols-2 place-items-center mt-8 mx-auto">
          <BerthCard title="Reservar amarra" amarra={amarra} mueveOno={false} />
          <div className="grid gap-2">
            <span className="font-medium text-lg w-full mx-auto text-center">Seleccione el periodo</span>
            <DatePicker
              renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
                <div className="rounded-2xl">
                  <button
                    aria-label="Previous Month"
                    className={"react-datepicker__navigation react-datepicker__navigation--previous"}
                    style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
                    onClick={decreaseMonth}
                  >
                    <span className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"}>
                      {"<"}
                    </span>
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
                    <span className={"react-datepicker__navigation-icon react-datepicker__navigation-icon--next"}>
                      {">"}
                    </span>
                  </button>
                </div>
              )}
              selected={startDate}
              onChange={onChange}
              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}
              // este reduce es para excluir los periodos de reserva hechas para la amarra
              excludeDateIntervals={amarra.reservations.reduce((acc, curr) => {
                acc.push({
                  start: normalizeDate(curr.dateLapse.startDate),
                  end: normalizeDate(curr.dateLapse.endDate),
                });
                return acc;
              }, [])}
              includeDateIntervals={amarra.availabilityDates.reduce((acc, curr) => {
                acc.push({
                  start: normalizeDate(curr.startDate),
                  end: normalizeDate(curr.endDate),
                });
                return acc;
              }, [])}
              selectsRange
              inline
              showDisabledMonthNavigation
              monthsShown={2}
            />
            <ActionButton text="Alquilar amarra" handleSubmit={handleSubmit} isDisabled={endDate ? false : true} />
          </div>
        </div>
      )}
    </>
  );
};

export default page;

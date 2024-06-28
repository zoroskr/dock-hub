"use client";

import React, { useEffect, useState } from "react";

import Title from "@/components/ui/Title";
import { getReservations } from "../services/reservations.api";
import Card from "@/components/ui/Card";
import Image from "next/image";

const page = () => {
  const [reservations, setReservations] = useState([]);

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
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  return (
    <>
      <Title text="Reservas" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {reservations && reservations.length > 0 ? (
          reservations.map((reservation) => (
            <Card key={reservation._id}>
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
            </Card>
          ))
        ) : (
          <span className="text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium">
            No hay alquileres realizados
          </span>
        )}
      </div>
    </>
  );
};

export default page;

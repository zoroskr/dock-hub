"use client";

import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { getUsers } from "@/app/services/users.api";

const ReservationCard = ({ reservation }) => {
  const [amarraOwner, setAmarraOwner] = useState();

  useEffect(() => {
    const fetchBoatOwner = async () => {
      const users = await getUsers();
      const owner = users.find((user) => {
        
        console.log("🚀 ~ owner ~ owner:", user.amarras.includes(reservation.amarra._id));
        return user.amarras.includes(reservation.amarra._id);
      });
      setAmarraOwner(owner);
    }
    fetchBoatOwner();
  }, []);

  const convertToDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const calculateDays = (dateLapse) => {
    const start = new Date(dateLapse.startDate);
    const end = new Date(dateLapse.endDate);
    const days = Math.abs(end - start) / 1000 / 60 / 60 / 24;
    return days;
  };

  return (
    <div className="max-w-sm bg-custom-gray mx-auto rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5 grid place-items-center">
        <h3 className="text-xl font-bold text-center text-custom-gray dark:text-gray-100">
          Amarra {reservation.amarra.mooringNumber} - {reservation.amarra.location}
        </h3>
        <p className="text-sm">
          Del {convertToDate(reservation.dateLapse.startDate)} al {convertToDate(reservation.dateLapse.endDate)}
        </p>
        <p className="text-sm"> {reservation.amarra.dailyRate} USD por día</p>
        <p className="text-sm">
          {reservation.amarra.dailyRate * calculateDays(reservation.dateLapse)} USD por{" "}
          {calculateDays(reservation.dateLapse)} días
        </p>
        {localStorage.getItem("type") === "Admin" && (
          <>
            <>{amarraOwner && <p>Dueño: {amarraOwner.fullName}</p>}</>
            <p>Alquilada por: {reservation.owner.fullName}</p>
          </>
        )}
        <Image
          src={reservation.amarra.image}
          width={300}
          height={300}
          className="rounded-xl"
          alt={reservation.amarra.location}
        />
      </div>
    </div>
  );
};

export default ReservationCard;

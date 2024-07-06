"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/ui/Title";
import Loading from "@/app/loading";
import { getReservations } from "../services/reservations.api";
import ReservationCard from "@/components/ui/ReservationCard";
import { getUser } from "../services/users.api";

const page = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      let data;
      if (localStorage.getItem("type") !== "Admin") {
        const user = await getUser(localStorage.getItem("id"));
        data = user.reservations;
      } else {
        data = await getReservations();
      }
      setReservations(data);
      setLoading(false);
    };
    fetchReservations();
  }, []);

  

  return (
    <>
      <Title text="Reservas" />
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation) => (
              <ReservationCard key={reservation._id} reservation={reservation} />
            ))
          ) : (
            <span className="text-3xl mt-auto mb-auto ml-auto mr-auto text-left p-3 col-span-3 font-medium">
              No hay alquileres realizados
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default page;

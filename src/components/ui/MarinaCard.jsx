"use client";

import React, { use, useState } from "react";
import ActionButton from "@/components/ui/ActionButton";
import Swal from "sweetalert2";
import { createReservation } from "@/app/services/reservations.api";
import { getUser } from "@/app/services/users.api";
import { useRouter } from "next/navigation";

const MarinaCard = ({ amarra, title, startDate, endDate }) => {
  const router = useRouter();

  const overlaps = (dateLapse, anotherDateLapse) => {
    const start = new Date(dateLapse.startDate);
    const end = new Date(dateLapse.endDate);
    const anotherStart = new Date(anotherDateLapse.startDate);
    const anotherEnd = new Date(anotherDateLapse.endDate);

    return !((anotherStart < start && anotherEnd < start) || (anotherStart > end && anotherEnd > end));
  };

  

  return (
    <div
      className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      onClick={() => {
        router.push(`/amarras/${amarra._id}`);
      }}
    >
      <div className="p-5 flex flex-col justify-between">
        <img src={"https://i.imgur.com/A4j1U5Y.jpeg"} alt={amarra.location} />
        <div>
          <h1 className="text-xl font-bold">{amarra.location}</h1>
          <p className="text-sm">
            Del {new Date(amarra.availability.startDate).toLocaleDateString()} al{" "}
            {new Date(amarra.availability.endDate).toLocaleDateString()}
          </p>
        </div>
        <span className="text-sm ">${amarra.dailyRate} USD por día</span>
      </div>
    </div>
  );
};

export default MarinaCard;

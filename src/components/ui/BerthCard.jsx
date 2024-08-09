"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";

const BerthCard = ({ amarra }) => {
  const router = useRouter();
  const params = useParams();

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toLocaleDateString();
  };

  const getAvailabilityStartDate = () => {
    const startDate =
      amarra.reservations.length > 0
        ? addDays(amarra.reservations[amarra.reservations.length - 1].dateLapse.endDate, 1)
        : new Date(amarra.availabilityDates[0].startDate).toLocaleDateString();
    return startDate;
  };

  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5 flex flex-col justify-between">
        <img src={"https://i.imgur.com/A4j1U5Y.jpeg"} alt={amarra.location} className="rounded-xl" />
        <div className="p-2">
          <h1 className="text-xl font-bold">{amarra.location}</h1>
          <p className="text-sm">Amarra {amarra.mooringNumber}</p>
          <p className="text-sm">
            Del {getAvailabilityStartDate()} al{" "}
            {new Date(amarra.availabilityDates[amarra.availabilityDates.length - 1].endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex w-full justify-between">
          <span className="text-sm ml-2">${amarra.dailyRate} USD por día</span>
          {!params.id && (
            <button
              className="bg-gray-800 text-white font-medium text-sm p-2 rounded-xl duration-300 hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                router.push(`/amarras/${amarra._id}`);
              }}
            >
              Alquilar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BerthCard;

"use client";

import React from "react";
import { useRouter } from "next/navigation";

const BerthCard = ({ amarra, mueveOno }) => {
  const router = useRouter();
  return (
    <div
      className={`max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 duration-500 ${mueveOno ? "hover:scale-105" : ""}`}
      // onClick={() => {
      //   router.push(`/amarras/${amarra._id}`);
      // }}
    >
      <div className="p-5 flex flex-col justify-between">
        <img src={"https://i.imgur.com/A4j1U5Y.jpeg"} alt={amarra.location} className="rounded-xl" />
        <div className="p-2">
          <h1 className="text-xl font-bold">{amarra.location}</h1>
          <p className="text-sm">
            Del {new Date(amarra.availabilityDates[0].startDate).toLocaleDateString()} al{" "}
            {new Date(amarra.availabilityDates[amarra.availabilityDates.length - 1].endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex w-full justify-between">
          <span className="text-sm ml-2">${amarra.dailyRate} USD por día</span>
          {mueveOno && (
            <div
              className="bg-gray-800 text-white font-medium text-sm p-2 rounded-xl duration-300 hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                router.push(`/amarras/${amarra._id}`);
              }}
            >
              Alquilar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BerthCard;

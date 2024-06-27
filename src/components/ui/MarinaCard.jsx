import React from "react";
import ActionButton from "@/components/ui/ActionButton";
import Swal from "sweetalert2";

const MarinaCard = ({ amarra }) => {
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: amarra.location,
          dateLapse: {
            startDate: amarra.availability.startDate,
            endDate: amarra.availability.endDate,
          },
          cost: amarra.dailyRate, // Cambiar a costo total
          image: "https://i.imgur.com/A4j1U5Y.jpeg",
          owner: localStorage.getItem("id"),
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
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
        text: "Ha ocurrido un error, por favor intenta de nuevo",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="max-w-sm bg-custom-gray rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className="p-5 flex flex-col justify-between">
        <img src={"https://i.imgur.com/A4j1U5Y.jpeg"} alt={amarra.location} />
        <div>
          <h1 className="text-xl font-bold">{amarra.location}</h1>
          <p className="text-sm">
            Del {new Date(amarra.availability.startDate).toLocaleDateString()} al{" "}
            {new Date(amarra.availability.startDate).toLocaleDateString()}
          </p>
        </div>
        <span className="text-sm ">${amarra.dailyRate} USD por día</span>
        <ActionButton title="Reservar alquiler" handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default MarinaCard;

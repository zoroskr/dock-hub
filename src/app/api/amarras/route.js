import { connectDB } from "@/libs/mongodb";
import Amarra from "@/models/Amarra";
import Reservation from "@/models/Reservation";
import { NextResponse } from "next/server";
import Boat from "@/models/Boat"; // Importa el modelo Boat


export async function GET() {
  await connectDB();

  try {
    // Busca todas las amarras y popula 'marina' y 'boat'
    const amarras = await Amarra.find()
      .populate('marina')
      .populate({
        path: 'boat',
        model: Boat // Nombre del modelo Boat
      });

    // Para cada amarra encontrada, busca sus reservas
    const amarrasWithReservations = await Promise.all(
      amarras.map(async (amarra) => {
        const reservations = await Reservation.find({ amarra: amarra._id });
        return {
          ...amarra.toJSON(),
          reservations,
        };
      })
    );

    return NextResponse.json(amarrasWithReservations);
  } catch (error) {
    console.error(error);
    return NextResponse.error("Error al obtener las amarras");
  }
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const amarra = await Amarra.create(data);
  return NextResponse.json(amarra);
}

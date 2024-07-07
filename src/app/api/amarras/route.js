import { connectDB } from "@/libs/mongodb";
import Amarra from "@/models/Amarra";
import Reservation from "@/models/Reservation";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const amarras = await Amarra.find().populate('marina');
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
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const amarra = await Amarra.create(data);
  return NextResponse.json(amarra);
}

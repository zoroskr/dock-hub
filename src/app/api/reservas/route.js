import { connectDB } from "@/libs/mongodb";
import Reserva from "@/models/Reserva";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const reservas = await Reserva.find();
  return NextResponse.json(reservas);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const reserva = Reserva.create(data);
  return NextResponse.json(reserva);
}

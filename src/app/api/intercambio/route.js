import { connectDB } from "@/libs/mongodb";
import Intercambio from "@/models/Intercambio";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const intercambios = await Intercambio.find();
  return NextResponse.json(intercambios);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  // Crear una nueva instancia de Intercambio con los datos recibidos
  const newIntercambio = new Intercambio({
    date: data.date,
    time: data.time,
    chatId: data.chatId,
    place: data.place,
  });

  // Guardar la nueva instancia en la base de datos
  await newIntercambio.save();

  // Devolver una respuesta indicando que el intercambio se ha creado correctamente
  return NextResponse.json({ message: "Intercambio created successfully" }, { status: 201 });
}
import { connectDB } from "@/libs/mongodb";
import Intercambio from "@/models/Intercambio";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params; // Aquí, 'id' se interpreta como 'chatId'

    if (!id) {
      return NextResponse.json({ error: "chatId is required" }, { status: 400 });
    }

    // Cambia aquí para buscar por 'chatId' en lugar del ID del documento
    const intercambio = await Intercambio.findOne({ chatId: id });

    if (!intercambio) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }

    return NextResponse.json(intercambio);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching chat" }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  // Crear una nueva instancia de Intercambio con los datos recibidos
  const newIntercambio = new Intercambio({
    date: data.date,
    time: data.time,
    chatId: data.chatId,
    place: data.place
  });

  // Guardar la nueva instancia en la base de datos
  await newIntercambio.save();

  // Devolver una respuesta indicando que el intercambio se ha creado correctamente
  return NextResponse.json({ message: "Intercambio created successfully" }, { status: 201 });
}
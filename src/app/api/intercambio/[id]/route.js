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

import { connectDB } from "@/libs/mongodb";
import Chat from "@/models/Chat"; // Asegúrate de importar el modelo de Chat
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const chat = await Chat.findById(id);

    if (!chat) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching chat" }, { status: 500 });
  }
}

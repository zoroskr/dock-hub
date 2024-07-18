import { connectDB } from "@/libs/mongodb";
import Chat from "@/models/Chat"; // Asegúrate de importar el modelo de Chat
import User from "@/models/User";
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

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const data = await request.json();
    const chat = await Chat.findByIdAndUpdate(id, data, { new: true });
    if (!chat) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    return NextResponse.json(chat);
  } catch (error) {
    return NextResponse.json({ error: "Error updating chat" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const chat = await Chat.findByIdAndDelete(id);
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // Elimina la referencia del chat en todos los usuarios
    await User.updateMany({ chats: id }, { $pull: { chats: id } });

    return NextResponse.json({ message: "Chat deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting chat" }, { status: 500 });
  }
}

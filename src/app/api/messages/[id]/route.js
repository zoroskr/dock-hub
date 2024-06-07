import { connectDB } from "@/libs/mongodb";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const message = await Message.findById(id);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching message" }, { status: 500 });
  }
}

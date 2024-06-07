import { connectDB } from "@/libs/mongodb";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const chats = await Chat.find();
  return NextResponse.json(chats);
}

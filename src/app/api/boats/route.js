import { connectDB } from "@/libs/mongodb";
import Boat from "@/models/Boat";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const chats = await Boat.find();
  return NextResponse.json(chats);
}
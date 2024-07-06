import { connectDB } from "@/libs/mongodb";
import Boat from "@/models/Boat";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const boats = await Boat.find();
  return NextResponse.json(boats);
}

export async function POST(request) {
    await connectDB();
    const data = await request.json();
    const boat = await Boat.create(data);
    return NextResponse.json(boat);
}  
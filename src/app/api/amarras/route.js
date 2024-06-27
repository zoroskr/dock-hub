import { connectDB } from "@/libs/mongodb";
import Amarra from "@/models/Amarra";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const amarras = await Amarra.find();
  return NextResponse.json(amarras);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const amarra = await Amarra.create(data);
  return NextResponse.json(amarra);
  
}

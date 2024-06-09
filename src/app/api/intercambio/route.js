import { connectDB } from "@/libs/mongodb";
import Intercambio from "@/models/Intercambio";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const intercambios = await Intercambio.find();
  return NextResponse.json(intercambios);
}

import { connectDB } from "@/libs/mongodb";
import Amarra from "@/models/Amarra";
import Reservation from "@/models/Reservation";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const amarra = await Amarra.findById(id);

    if (!amarra) {
      return NextResponse.json({ error: "amarra not found" }, { status: 404 });
    }

    // obtener las reservas de una amarra
    const reservations = await Reservation.find({ _id: { $in: amarra.reservations } });
    amarra.reservations = reservations;

    return NextResponse.json(amarra);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching amarra" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updatedAmarra = await request.json();

    const amarra = await Amarra.findByIdAndUpdate(id, updatedAmarra, { new: true });

    if (!amarra) {
      return NextResponse.json({ error: "amarra not found" }, { status: 404 });
    }

    return NextResponse.json(amarra);
  } catch (error) {
    return NextResponse.json({ error: "Error updating amarra" }, { status: 500 });
  }
}

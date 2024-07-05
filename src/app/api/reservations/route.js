import { connectDB } from "@/libs/mongodb";
import Amarra from "@/models/Amarra";
import Reservation from "@/models/Reservation";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const reservations = await Reservation.find().populate("owner").populate("amarra");
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching reservations" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const reservationData = await request.json();
    const { owner } = reservationData;

    if (!owner) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const newReservation = await Reservation.create(reservationData);

    const user = await User.findById(owner);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.reservations.push(newReservation._id);
    await user.save();


    const { amarra } = reservationData;
    const amarra2 = await Amarra.findById(amarra);
    amarra2.reservations.push(newReservation._id);
    await amarra2.save();

    return NextResponse.json(newReservation);
  } catch (error) {
    return NextResponse.json({ error: "Error creating reservation" }, { status: 500 });
  }
}

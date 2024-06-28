import { connectDB } from "@/libs/mongodb";
import Reservation from "@/models/Reservation";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const reservations = await Reservation.find();
  return NextResponse.json(reservations);
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

    return NextResponse.json(newReservation);
  } catch (error) {
    return NextResponse.json({ error: "Error creating reservation" }, { status: 500 });
  }
}

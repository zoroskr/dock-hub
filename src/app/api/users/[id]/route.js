import { connectDB } from "@/libs/mongodb";
import User from "@/models/User";
import Reservation from "@/models/Reservation";
import { NextResponse } from "next/server";
import Amarra from "@/models/Amarra";
import Marina from "@/models/Marina";
import Boat from "@/models/Boat";
import Post from "@/models/Post";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // obtener los datos referenciados
    const posts = await Post.find({ _id: { $in: user.posts } });

    const reservations = await Reservation.find({ _id: { $in: user.reservations } });

    const marinasPromises = reservations.map(async (reservation) => {
      const amarra = await Amarra.findById(reservation.amarra);
      const owner = user;
      return { ...reservation.toObject(), amarra, owner };
    });

    const reservationsWithMarinas = await Promise.all(marinasPromises);

    const amarras = await Amarra.find({ _id: { $in: user.amarras } });

    const amarrasWithMarinasPromises = amarras.map(async (amarra) => {
      const marina = await Marina.findById(amarra.marina);
      return { ...amarra.toObject(), marina };
    });
    const amarrasWithMarinas = await Promise.all(amarrasWithMarinasPromises);

    const amarrasWithMarinasAndBoatsPromises = amarrasWithMarinas.map(async (amarra) => {
      const boat = await Boat.findById(amarra.boat);
      return { ...amarra, boat };
    });
    const amarrasWithMarinasAndBoats = await Promise.all(amarrasWithMarinasAndBoatsPromises);

    const amarrasWithMarinasAndBoatsAndReservationsPromises = amarrasWithMarinasAndBoats.map(async (amarra) => {
      const reservations = await Reservation.find({ amarra: amarra._id });
      return { ...amarra, reservations };
    });
    const amarrasWithMarinasAndBoatsAndReservations = await Promise.all(
      amarrasWithMarinasAndBoatsAndReservationsPromises,
    );

    const boats = await Boat.find({ _id: { $in: user.boats } });

    const userWithReservations = {
      ...user.toObject(),
      posts,
      reservations: reservationsWithMarinas,
      amarras: amarrasWithMarinasAndBoatsAndReservations,
      boats,
    };

    return NextResponse.json(userWithReservations);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
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
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const id = params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}

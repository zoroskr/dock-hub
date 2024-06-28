import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import Reservation from "@/models/Reservation";
import { NextResponse } from "next/server";

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

    // Paso 2: Consulta los documentos relacionados (reservaciones)
    // Asumiendo que tienes un campo en el usuario que almacena los IDs de las reservaciones
    const reservations = await Reservation.find({ _id: { $in: user.reservations } });

    // Paso 3: Combina los resultados
    // Esto depende de cómo quieras estructurar los datos, un ejemplo simple sería:
    const userWithReservations = {
      ...user.toObject(),
      reservations,
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

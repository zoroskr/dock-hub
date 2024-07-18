import { connectDB } from "@/libs/mongodb";
import Boat from "@/models/Boat";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const boat = await Boat.findById(id);

    if (!boat) {
      return NextResponse.json({ error: "boat not found" }, { status: 404 });
    }

    return NextResponse.json(boat);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching boat" }, { status: 500 });
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
    const boat = await Boat.findByIdAndUpdate(id, data, { new: true });
    if (!boat) {
      return NextResponse.json({ error: "boat not found" }, { status: 404 });
    }
    return NextResponse.json(boat);
  } catch (error) {
    return NextResponse.json({ error: "Error updating boat" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const boat = await Boat.findByIdAndDelete(id);
    if (!boat) {
      return NextResponse.json({ error: "Boat not found" }, { status: 404 });
    }

    // Elimina la referencia del chat en todos los usuarios
    await User.updateMany({ boats: id }, { $pull: { boats: id } });

    return NextResponse.json({ message: "Boat deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting boat" }, { status: 500 });
  }
}

import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
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
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const {id} = params;
        if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }
        const user = await User.findByIdAndUpdate(id, request.body, { new: true });
        if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    }
    catch (error) {
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

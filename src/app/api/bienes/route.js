import { connectDB } from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const user = await User.create(data);
  return NextResponse.json(user);
}

export async function PUT(request) {
  await connectDB();
  const { email, ...data } = await request.json();
  const user = await User.findOneAndUpdate({ email }, data, { new: true });
  return NextResponse.json(user);
}
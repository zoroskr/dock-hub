import { connectDB } from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(request) {
    await connectDB();
    const { body } = request;
    const { email } = body;
    const user = await User.findOne({ email });
    return NextResponse.json(user);
  }
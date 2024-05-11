import { connectDB } from '@/libs/mongodb';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const posts = await Post.find();
  return NextResponse.json(posts);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const post = await Post.create(data);
  return NextResponse.json(post);
  
}

/*
export async function PUT(request) {
  await connectDB();
  const { } = await request.json();
  const post = await Post.findOneAndUpdate({ email }, data, { new: true });
  return NextResponse.json(post);
}
*/
import { connectDB } from "@/libs/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const posts = await Post.find();
  return NextResponse.json(posts);
}

export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();
    const { owner } = data;

    const user = await User.findById(owner);

    const post = await Post.create(data);

    user.posts.push(post._id);
    await user.save();

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
  }
}

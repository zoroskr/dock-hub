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
    console.log("🚀 ~ POST ~ user:", user)
    
    const post = await Post.create(data);
    console.log("🚀 ~ POST ~ post:", post)
    console.log("🚀 ~ POST ~ user.posts:", user.posts)
    
    user.posts.push(post._id);
    await user.save();

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
  }
}

import { connectDB } from '@/libs/mongodb';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ error: 'post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}


export async function PUT(request, {params}) {
try {
  await connectDB();
  const id = params;
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  const post = await Post.findByIdAndUpdate(id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
} catch (error) {
  return NextResponse.json({ error: 'Error fetching Post' }, { status: 500 });
}
}

export async function DELETE(request, {params}) {
try {
  await connectDB();
  const id = params;
  if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
} catch (error) {
  return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
}
}
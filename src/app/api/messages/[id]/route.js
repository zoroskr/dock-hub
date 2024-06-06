import { connectDB } from '@/libs/mongodb';
import Message from '@/models/Message';
import Chat from '@/models/Chat'; // Asegúrate de importar el modelo de Chat
import { NextResponse } from 'next/server';



export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const post = await Chat.findById(id);

    if (!post) {
      return NextResponse.json({ error: 'post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}




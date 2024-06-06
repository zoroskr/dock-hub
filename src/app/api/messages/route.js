import Chat from '@/models/Chat'; // Asegúrate de importar el modelo de Chat
import { connectDB } from '@/libs/mongodb';
import Message from '@/models/Message';
import { NextResponse } from 'next/server';



export async function POST(request) {
    await connectDB();
    const { sender, content, chatId } = await request.json();
  
    // Crear un nuevo mensaje
    const newMessage = new Message({ sender, content });
    await newMessage.save();
  
    // Encontrar el chat y agregar el mensaje a su lista de mensajes
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' });
    }
    chat.messages.push(newMessage._id); // Asegúrate de agregar el id del mensaje
    await chat.save();
  
    return NextResponse.json(newMessage);
  }


export async function GET() {
  await connectDB();

  // Obtener todos los mensajes
  const messages = await Message.find();

  return NextResponse.json(messages);
}

import { connectDB } from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';


export async function PUT(request) {
  await connectDB();
  const { token } = await request.json();

  // Buscar al usuario con el token proporcionado
  const user = await User.findOne({ confirmationToken: token });

  if (!user) {
    return NextResponse.error(404, 'Usuario no encontrado');
  }

  // Verificar al usuario
  user.verified = true;
  await user.save();

  return NextResponse.json({ message: 'Usuario verificado' });
}
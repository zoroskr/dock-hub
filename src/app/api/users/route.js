import { connectDB } from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';


export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ivanskrt1@gmail.com', //TU EMAIL
    pass: 'cawt heob hzhr feqh' //GENERAR CONTRASEÑA POR GOOGLE APP PASSWORD
  }
});

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  // Genera un token único
  const confirmationToken = crypto.randomBytes(20).toString('hex');

  // Crea el usuario con el token y el estado de confirmación
  const user = await User.create({
    ...data,
    confirmationToken
  });

  if (user.type === 'Titular') {
    // Obtén todos los usuarios administrativos
    const adminUsers = await User.find({ type: 'Administrativo' });

    // Envía un correo electrónico a cada usuario administrativo
    for (const adminUser of adminUsers) {
      let mailOptions = {
        from: 'yatemate@gmail.com',
        to: adminUser.email, // Cambia el destinatario al correo electrónico del usuario administrativo
        subject: 'New Titular User Created',
        text: `Un nuevo titular fue creado: ${user.email} ${user.DNI}. Porfavor confirmar a traves de este link: http://localhost:3000/confirmpage el token del usuario a verificar es: ${confirmationToken}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  }

  return NextResponse.json(user);
}
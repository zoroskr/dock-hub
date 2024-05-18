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
    user: 'mundofelipote@gmail.com', //TU EMAIL
    pass: '' //GENERAR CONTRASEÑA POR GOOGLE APP PASSWORD
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
    let mailOptions = {
      from: 'your-email@gmail.com',
      to: 'mundofelipote@gmail.com',
      subject: 'New Titular User Created',
      text: `A new titular user has been created: ${user.name}. Please confirm your registration by clicking the following link: http://localhost:3000/confirmpage el token del usuario a verificar es: ${confirmationToken}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  return NextResponse.json(user);
}

export async function PUT(request) {
  await connectDB();
  const { _id, ...data } = await request.json();
   const user = await User.findOneAndUpdate({ _id }, data, { new: true });
  return NextResponse.json(user);
}
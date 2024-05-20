import { connectDB } from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';



export async function POST(request) {
    await connectDB();
    const data = await request.json();
    console.log(data);
  
    // Crea los usuarios
    const proposer = await User.create(data.proposer);
    const owner = await User.create(data.owner);
  
    // Configura el transportador de correo
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mundofelipote@gmail.com',
        pass: ''
      }
    });
  
    // Configura las opciones de correo para el propietario
    let mailOptionsOwner = {
      from: "mundofelipote@gmail.com",
      to: owner.email,
      subject: 'Propuesta de intercambio',
      text: `Hola ${owner.fullName}, ${proposer.fullName} ha propuesto un intercambio.`
    };
  
  
    // Envía el correo al propietario
    transporter.sendMail(mailOptionsOwner, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent to owner: ' + info.response);
      }
    });
  
  
    return NextResponse.json({proposer, owner});
  }
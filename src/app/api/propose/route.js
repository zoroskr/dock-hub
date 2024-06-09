import { connectDB } from '@/libs/mongodb';
import User from '@/models/user';
import Chat from '@/models/Chat';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


export async function POST(request) {
    await connectDB();
    const data = await request.json();
    console.log(data);
  
    // Crea los usuarios
    let proposer = await User.findOne({ email: data.proposer.email });
    let owner = await User.findOne({ email: data.owner.email });
    
    const newChat = new Chat({ users: [proposer, owner]});
    await newChat.save();
  
    // Configura el transportador de correo
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'test@test.com',
        pass: 'cawt heob hzhr feqh'
      }
    });
  
    // Configura las opciones de correo para el propietario
    let mailOptionsOwner = {
      from: "yatemate@gmail.com",
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
  
  
    return NextResponse.json({proposer, owner, newChat});
  }
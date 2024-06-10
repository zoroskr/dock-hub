import mongoose from 'mongoose';

// Definición del esquema
const intercambioSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // Formato HH:mm
    required: true
  },
  chatId: {
    type: String, 
    required: true
  },
  place: {
    type: String,
    required: true
  }
}, { timestamps: true }); // Añade automáticamente campos para createdAt y updatedAt

export default mongoose.models.Intercambio || mongoose.model('Intercambio', intercambioSchema);

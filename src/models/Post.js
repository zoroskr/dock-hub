import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  plate: String,
  name: String,
  description: String,
  image: String,
  owner: String,
  type: String, // "Vehículos", "Aeronaves", "Inmuebles", "Embarcaciones"
  state: String, // "Activo", "Pendiente", "Pausado"
  adapted: Boolean // Adaptado para gente con discapacidad o no
});

export default mongoose.models.Post || mongoose.model('Post', schema);
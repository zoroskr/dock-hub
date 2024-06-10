import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  plate: String,
  name: String,
  description: String,
  image: String,
  owner: String,
  type: String, // "Vehículos", "Aeronaves", "Inmuebles", "Embarcaciones"
  state: String // "Activo", "Pendiente", "Pausado"
});

export default mongoose.models.Post || mongoose.model('Post', schema);
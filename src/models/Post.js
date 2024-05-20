import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  owner: String,
  type: String, // "Titular", "Regular", "Administrativo"
  state: String // "Aprobado", "Pendiente", "Pausado"
});

export default mongoose.models.Post || mongoose.model('Post', schema);
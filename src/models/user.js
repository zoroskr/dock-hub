import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fullName: String,
  DNI: Number,
  address: String,
  email: String,
  password: String,
  type: String, // "Titular", "Regular", "Administrativo"
  verified: Boolean,
  confirmationToken: String
});

export default mongoose.models.User || mongoose.model('User', schema);